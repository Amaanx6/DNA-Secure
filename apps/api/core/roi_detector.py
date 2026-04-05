"""Region of Interest (ROI) detection for medical images."""

import numpy as np
import cv2
from typing import Tuple, Optional
import base64


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
        # Convert to grayscale if needed
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image

        # Normalize image
        if gray.max() > 1.0:
            gray = gray.astype(np.float32) / 255.0
        else:
            gray = gray.astype(np.float32)

        # Compute local entropy
        entropy_map = ROIDetector._compute_entropy(gray)

        # Compute edges using Sobel
        sobelx = cv2.Sobel(gray, cv2.CV_32F, 1, 0, ksize=3)
        sobely = cv2.Sobel(gray, cv2.CV_32F, 0, 1, ksize=3)
        edges = np.sqrt(sobelx**2 + sobely**2)

        # Combine entropy and edges
        heatmap = entropy_map + edges * 0.5

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
        Compute local entropy of image.
        
        Args:
            image: Input image (normalized 0-1)
            window_size: Size of entropy computation window
            
        Returns:
            Entropy map
        """
        h, w = image.shape
        entropy = np.zeros_like(image)

        # Pad image
        pad = window_size // 2
        padded = np.pad(image, pad, mode="edge")

        for i in range(h):
            for j in range(w):
                window = padded[i:i+window_size, j:j+window_size]
                # Histogram-based entropy
                hist, _ = np.histogram(window, bins=256, range=(0, 1))
                hist = hist[hist > 0]  # Remove zero bins
                probs = hist / hist.sum()
                entropy[i, j] = -np.sum(probs * np.log2(probs + 1e-6))

        return entropy / 8.0  # Normalize

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
