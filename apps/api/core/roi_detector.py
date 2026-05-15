"""Region of Interest (ROI) detection for medical images."""

import numpy as np
import cv2
from typing import Tuple, Optional
import base64
from scipy.ndimage import uniform_filter


class ROIDetector:
    """Detect and visualize regions of interest in medical images."""

    @staticmethod
    def detect_roi(
        image: np.ndarray,
        sensitivity: int = 5
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        Detect ROI using entropy and edge detection.
        
        Args:
            image: Medical image array
            sensitivity: ROI sensitivity (1-10, where 10 is highest sensitivity)
            
        Returns:
            Tuple of (ROI mask, heatmap)
        """
        h_full, w_full = image.shape[:2]

        # Convert to grayscale if needed (PIL / route uses RGB order)
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        else:
            gray = image

        # Normalize image
        if gray.max() > 1.0:
            gray = gray.astype(np.float32) / 255.0
        else:
            gray = gray.astype(np.float32)

        # Downscale for ROI math: full-res per-pixel Python entropy is unusably slow on large scans
        max_side = 384
        if max(h_full, w_full) > max_side:
            scale = max_side / max(h_full, w_full)
            nw, nh = max(1, int(w_full * scale)), max(1, int(h_full * scale))
            gray_work = cv2.resize(gray, (nw, nh), interpolation=cv2.INTER_AREA)
        else:
            gray_work = gray

        # Compute local entropy (on working resolution)
        entropy_map = ROIDetector._compute_entropy(gray_work)

        # Compute edges using Sobel
        sobelx = cv2.Sobel(gray_work, cv2.CV_32F, 1, 0, ksize=3)
        sobely = cv2.Sobel(gray_work, cv2.CV_32F, 0, 1, ksize=3)
        edges = np.sqrt(sobelx**2 + sobely**2)

        # Combine entropy and edges
        heatmap = entropy_map + edges * 0.5

        # Upscale heatmap / mask to full resolution for downstream display
        if heatmap.shape[0] != h_full or heatmap.shape[1] != w_full:
            heatmap = cv2.resize(heatmap, (w_full, h_full), interpolation=cv2.INTER_LINEAR)

        # Normalize heatmap
        heatmap = (heatmap - heatmap.min()) / (heatmap.max() - heatmap.min() + 1e-6)

        # Create binary mask based on sensitivity
        # Lower sensitivity = higher threshold = smaller ROI
        threshold = (11 - sensitivity) / 10.0  # Invert so 10 = 0.1, 1 = 1.0
        roi_mask = (heatmap > threshold).astype(np.uint8) * 255

        return roi_mask, heatmap

    @staticmethod
    def _compute_entropy(image: np.ndarray, window_size: int = 5) -> np.ndarray:
        """
        Fast local texture map (windowed std dev), used like entropy for ROI weighting.
        Replaces per-pixel Python histogram loops (those timed out on large medical images).
        """
        mean = uniform_filter(image, size=window_size, mode="nearest")
        mean_sq = uniform_filter(image * image, size=window_size, mode="nearest")
        var = np.clip(mean_sq - mean * mean, 0.0, None)
        return np.sqrt(var + 1e-8)

    @staticmethod
    def heatmap_to_image(heatmap: np.ndarray, colormap: int = cv2.COLORMAP_JET) -> np.ndarray:
        """
        Convert heatmap to colored image.
        
        Args:
            heatmap: Heatmap array (0-1)
            colormap: OpenCV colormap
            
        Returns:
            Colored image
        """
        # Ensure 0-1 range
        heatmap = np.clip(heatmap, 0, 1)

        # Convert to 8-bit
        heatmap_8bit = (heatmap * 255).astype(np.uint8)

        # Apply colormap
        colored = cv2.applyColorMap(heatmap_8bit, colormap)

        return colored

    @staticmethod
    def to_base64(array: np.ndarray) -> str:
        """
        Convert numpy array to base64-encoded PNG.
        
        Args:
            array: Image array
            
        Returns:
            Base64-encoded PNG string
        """
        if array.dtype != np.uint8:
            array = (np.clip(array, 0, 1) * 255).astype(np.uint8)

        # Ensure RGB format
        if len(array.shape) == 2:
            array = cv2.cvtColor(array, cv2.COLOR_GRAY2RGB)
        elif array.shape[2] == 4:
            array = cv2.cvtColor(array, cv2.COLOR_BGRA2RGB)

        # Encode to PNG
        success, buffer = cv2.imencode(".png", array)
        if not success:
            raise ValueError("Failed to encode image to PNG")

        # Convert to base64
        b64 = base64.b64encode(buffer).decode()
        return b64


def test_roi_detector():
    """Test ROI detection."""
    # Create sample image
    image = np.random.rand(100, 100).astype(np.float32)

    detector = ROIDetector()
    mask, heatmap = detector.detect_roi(image, sensitivity=5)

    print(f"Mask shape: {mask.shape}")
    print(f"Heatmap shape: {heatmap.shape}")
    print(f"Mask range: {mask.min()} - {mask.max()}")
    print(f"Heatmap range: {heatmap.min():.3f} - {heatmap.max():.3f}")


if __name__ == "__main__":
    test_roi_detector()
