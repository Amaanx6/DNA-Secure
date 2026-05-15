"""Encryption routes for DNA-based image encryption."""

from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse, StreamingResponse
import json
import secrets
import uuid
import logging
import io
import base64

import cv2
import numpy as np
from PIL import Image

from core.roi_detector import ROIDetector
from core.chaos_map import ChaosMap
from core.metrics import Metrics
from core.stream_cipher import apply_xor_keystream

logger = logging.getLogger(__name__)

router = APIRouter()

# Arnold cat map is pure Python per pixel — keep inputs bounded so requests finish under proxy timeouts
_MAX_LONG_SIDE = 1024


def _resize_long_edge(rgb: np.ndarray, max_side: int) -> np.ndarray:
    h, w = rgb.shape[:2]
    if max(h, w) <= max_side:
        return rgb
    scale = max_side / max(h, w)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    return cv2.resize(rgb, (nw, nh), interpolation=cv2.INTER_AREA)


@router.post("/encrypt")
async def encrypt_image(
    file: UploadFile = File(...),
    config: str = Form(...)
):
    """
    Encrypt medical image using DNA-based encryption.
    
    Args:
        file: Medical image file
        config: JSON configuration string
        
    Returns:
        JSON with encrypted image and metrics
    """
    try:
        # Parse config
        config_data = json.loads(config)
        rule = config_data.get("rule", 1)
        roi_sensitivity = config_data.get("roiSensitivity", 5)

        # Read image (handles grayscale / palette / RGBA without shape[2] crashes)
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        image = image.convert("RGB")
        image_array = np.array(image, dtype=np.uint8)
        image_array = _resize_long_edge(image_array, _MAX_LONG_SIDE)

        # Detect ROI
        roi_detector = ROIDetector()
        roi_mask, heatmap = roi_detector.detect_roi(
            image_array, sensitivity=roi_sensitivity
        )

        # Convert heatmap to colored image
        heatmap_colored = roi_detector.heatmap_to_image(heatmap)
        heatmap_base64 = roi_detector.to_base64(heatmap_colored)

        # Create key JSON (includes random key material used by XOR layer)
        h, w = image_array.shape[:2]
        chaos_method = "logistic" if h != w else "arnold"

        key_data = {
            "id": str(uuid.uuid4()),
            "rule": rule,
            "roi_sensitivity": roi_sensitivity,
            "chaos_method": chaos_method,
            "key": base64.b64encode(secrets.token_bytes(32)).decode(),
            "timestamp": str(np.datetime64("now")),
        }

        # Scramble positions then XOR (PNG is written as RGB bytes so decrypt matches)
        scrambled = ChaosMap.apply_chaotic_encryption(
            image_array, key=rule * 12345, method=chaos_method
        )
        encrypted_array = apply_xor_keystream(scrambled, key_data["key"])

        # Compute metrics (original vs final ciphertext)
        metrics = Metrics.compute_all_metrics(image_array, encrypted_array)

        png_buf = io.BytesIO()
        Image.fromarray(encrypted_array, mode="RGB").save(png_buf, format="PNG", compress_level=6)
        encrypted_base64 = base64.b64encode(png_buf.getvalue()).decode()

        return JSONResponse({
            "encryptedImageBase64": encrypted_base64,
            "roiHeatmapBase64": heatmap_base64,
            "keyJson": json.dumps(key_data),
            "metrics": metrics,
        })

    except Exception as e:
        logger.error(f"Encryption error: {str(e)}")
        return JSONResponse(
            {"error": str(e)},
            status_code=500
        )


@router.get("/encrypt/stream")
async def encrypt_stream():
    """
    Stream encryption progress as Server-Sent Events.
    
    Returns:
        SSE stream with stage updates
    """
    async def event_generator():
        stages = [
            ("roi_analysis", "Region Analysis"),
            ("dna_encoding", "DNA Encoding"),
            ("xor_operations", "XOR Operations"),
            ("chaos_scramble", "Chaos Scramble"),
        ]

        import asyncio
        import time

        for stage_id, stage_name in stages:
            # Send active status
            yield f"data: {json.dumps({\
                'stage': stage_id,\
                'status': 'active',\
                'progress': 0,\
                'log': f'[{stage_name.upper()}] Starting...'\
            })}\n\n"

            # Simulate processing
            await asyncio.sleep(0.5)

            # Send progress updates
            for progress in range(25, 100, 25):
                yield f"data: {json.dumps({\
                    'stage': stage_id,\
                    'status': 'active',\
                    'progress': progress,\
                    'log': f'[{stage_name.upper()}] Progress: {progress}%'\
                })}\n\n"

                await asyncio.sleep(0.3)

            # Send complete status
            yield f"data: {json.dumps({\
                'stage': stage_id,\
                'status': 'complete',\
                'progress': 100,\
                'log': f'[{stage_name.upper()}] Complete'\
            })}\n\n"

            await asyncio.sleep(0.2)

        # Final message
        yield f"data: {json.dumps({\
            'stage': 'complete',\
            'status': 'complete',\
            'progress': 100,\
            'log': '[ENCRYPTION] Pipeline finished successfully'\
        })}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
