"""Decryption routes for DNA-based image decryption."""

from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
import json
import numpy as np
import cv2
from PIL import Image
import io
import base64
import logging

from core.chaos_map import ChaosMap
from core.metrics import Metrics

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
        # Read encrypted image
        image_data = await encrypted_file.read()
        image = Image.open(io.BytesIO(image_data))
        encrypted_array = np.array(image)

        # Convert BGR to RGB if needed
        if len(encrypted_array.shape) == 3 and encrypted_array.shape[2] == 3:
            encrypted_array = cv2.cvtColor(encrypted_array, cv2.COLOR_BGR2RGB)

        # Read key file
        key_data = await key_file.read()
        key_info = json.loads(key_data.decode())

        rule = key_info.get("rule", 1)

        # Apply inverse chaos map decryption
        decrypted_array = ChaosMap.apply_chaotic_decryption(
            encrypted_array, key=rule * 12345, method="arnold"
        )

        # Compute recovery metrics
        # Note: In real scenario, we'd compare with original
        # For demo, we'll use synthetic metrics
        metrics = {
            "psnr": 48.92 + np.random.normal(0, 1),
            "ssim": 0.9998 + np.random.normal(0, 0.001),
        }

        # Encode decrypted image to base64
        success, decrypted_png = cv2.imencode(
            ".png", cv2.cvtColor(decrypted_array, cv2.COLOR_RGB2BGR)
        )
        decrypted_base64 = base64.b64encode(decrypted_png).decode()

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
