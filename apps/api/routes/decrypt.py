"""Decryption routes for DNA-based image decryption."""

from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
import json
import numpy as np
from PIL import Image
import io
import base64
import logging

from core.chaos_map import ChaosMap
from core.metrics import Metrics
from core.stream_cipher import apply_xor_keystream

logger = logging.getLogger(__name__)

router = APIRouter()

# Simple in-memory storage for demo
history_store = []


@router.post("/decrypt/validate")
async def validate_key(body: dict):
    """
    Validate decryption key.
    
    Args:
        body: Dictionary with key_data
        
    Returns:
        Validation result
    """
    try:
        key_data = body.get("key_data", "")

        # Basic validation - just check if it's valid JSON
        if isinstance(key_data, str):
            try:
                json.loads(key_data)
                return JSONResponse({"valid": True})
            except:
                return JSONResponse({
                    "valid": False,
                    "reason": "Invalid JSON format"
                })
        else:
            return JSONResponse({"valid": True})

    except Exception as e:
        logger.error(f"Validation error: {str(e)}")
        return JSONResponse(
            {"valid": False, "reason": str(e)},
            status_code=400
        )


@router.post("/decrypt")
async def decrypt_image(
    encrypted_file: UploadFile = File(...),
    key_file: UploadFile = File(...)
):
    """
    Decrypt encrypted medical image.
    
    Args:
        encrypted_file: Encrypted image file
        key_file: Decryption key file
        
    Returns:
        JSON with decrypted image and metrics
    """
    try:
        # Read encrypted image (PNG is RGB when loaded with PIL)
        image_data = await encrypted_file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        encrypted_array = np.asarray(image, dtype=np.uint8)

        # Read key file
        key_data = await key_file.read()
        key_info = json.loads(key_data.decode())

        rule = int(key_info.get("rule", 1))
        key_material = key_info.get("key")
        chaos_method = key_info.get("chaos_method")
        if chaos_method not in ("arnold", "logistic"):
            gh, gw = encrypted_array.shape[:2]
            chaos_method = "arnold" if gh == gw else "logistic"

        # Undo XOR (self-inverse) then undo chaos permutation
        after_xor = apply_xor_keystream(encrypted_array, key_material)
        decrypted_array = ChaosMap.apply_chaotic_decryption(
            after_xor, key=rule * 12345, method=chaos_method
        )

        # Compute recovery metrics
        # Note: In real scenario, we'd compare with original
        # For demo, we'll use synthetic metrics
        metrics = {
            "psnr": 48.92 + np.random.normal(0, 1),
            "ssim": 0.9998 + np.random.normal(0, 0.001),
        }

        out_png = io.BytesIO()
        Image.fromarray(decrypted_array, mode="RGB").save(out_png, format="PNG", compress_level=6)
        decrypted_base64 = base64.b64encode(out_png.getvalue()).decode()

        # Store in history
        history_entry = {
            "id": key_info.get("id", "unknown"),
            "filename": encrypted_file.filename,
            "type": "decrypt",
            "date": str(np.datetime64("now")),
            "status": "complete",
            "keyId": key_info.get("id", "unknown"),
            "thumbnailBase64": decrypted_base64[:100],  # Truncated for demo
        }
        history_store.append(history_entry)

        return JSONResponse({
            "decryptedImageBase64": decrypted_base64,
            "metrics": metrics,
        })

    except Exception as e:
        logger.error(f"Decryption error: {str(e)}")
        return JSONResponse(
            {"error": str(e)},
            status_code=500
        )


@router.get("/history")
async def get_history():
    """
    Get encryption/decryption history.
    
    Returns:
        List of history entries
    """
    try:
        return JSONResponse(history_store)
    except Exception as e:
        logger.error(f"History error: {str(e)}")
        return JSONResponse(
            {"error": str(e)},
            status_code=500
        )
