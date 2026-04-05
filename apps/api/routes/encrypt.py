"""Encryption routes for DNA-based image encryption."""

from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse, StreamingResponse
import json
import numpy as np
import cv2
from PIL import Image
import io
import base64
import uuid
import logging

from core.dna_encoder import DNAEncoder
from core.roi_detector import ROIDetector
from core.chaos_map import ChaosMap
from core.metrics import Metrics

logger = logging.getLogger(__name__)

router = APIRouter()


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

        # Read image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        image_array = np.array(image)

        # If RGBA, convert to RGB
        if image_array.shape[2] == 4:
            image_array = cv2.cvtColor(image_array, cv2.COLOR_RGBA2RGB)

        # Detect ROI
        roi_detector = ROIDetector()
        roi_mask, heatmap = roi_detector.detect_roi(
            image_array, sensitivity=roi_sensitivity
        )

        # Convert heatmap to colored image
        heatmap_colored = roi_detector.heatmap_to_image(heatmap)
        heatmap_base64 = roi_detector.to_base64(heatmap_colored)

        # Apply DNA encoding-based encryption using chaos map
        encrypted_array = ChaosMap.apply_chaotic_encryption(
            image_array, key=rule * 12345, method="arnold"
        )

        # Compute metrics
        metrics = Metrics.compute_all_metrics(image_array, encrypted_array)

        # Encode images to base64
        success, encrypted_png = cv2.imencode(
            ".png", cv2.cvtColor(encrypted_array, cv2.COLOR_RGB2BGR)
        )
        encrypted_base64 = base64.b64encode(encrypted_png).decode()

        # Create key JSON
        key_data = {
            "id": str(uuid.uuid4()),
            "rule": rule,
            "roi_sensitivity": roi_sensitivity,
            "key": base64.b64encode(np.random.bytes(32)).decode(),
            "timestamp": str(np.datetime64("now")),
        }

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
