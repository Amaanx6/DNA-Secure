"""Reversible XOR keystream bound to the per-file key material (base64 in key JSON)."""

from __future__ import annotations

import base64
from hashlib import sha256

import numpy as np


def apply_xor_keystream(arr: np.ndarray, key_b64: str | None) -> np.ndarray:
    """
    XOR every byte of `arr` with a deterministic stream derived from `key_b64`.
    Applying twice returns the original (self-inverse), so encrypt and decrypt use the same call.
    """
    if not key_b64:
        return arr

    try:
        seed = base64.b64decode(key_b64)
    except Exception:
        return arr

    if len(seed) == 0:
        return arr

    flat = np.ascontiguousarray(arr).reshape(-1)
    n = flat.size
    stream = bytearray()
    ctr = 0
    while len(stream) < n:
        stream.extend(sha256(seed + ctr.to_bytes(8, "big", signed=False)).digest())
        ctr += 1

    mask = np.frombuffer(bytes(stream[:n]), dtype=np.uint8)
    out = (flat.astype(np.uint16) ^ mask.astype(np.uint16)) & 0xFF
    return out.astype(arr.dtype).reshape(arr.shape)
