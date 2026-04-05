"""Image quality and security metrics."""

import numpy as np
from typing import Dict
import cv2


class Metrics:
    """Compute security and quality metrics for encrypted images."""

    @staticmethod
    def psnr(original: np.ndarray, processed: np.ndarray) -> float:
        """
        Calculate Peak Signal-to-Noise Ratio.
        
        Args:
            original: Original image
            processed: Processed image
            
        Returns:
            PSNR value in dB
        """
        # Normalize images to 0-1 range
        if original.max() > 1:
            original = original.astype(np.float32) / 255.0
        if processed.max() > 1:
            processed = processed.astype(np.float32) / 255.0

        # Compute MSE
        mse = np.mean((original - processed) ** 2)

        if mse == 0:
            return 100.0  # Perfect match

        # PSNR formula: 10 * log10(1 / MSE)
        psnr_value = 10 * np.log10(1.0 / mse)

        return float(psnr_value)

    @staticmethod
    def ssim(original: np.ndarray, processed: np.ndarray, window_size: int = 11) -> float:
        """
        Calculate Structural Similarity Index.
        
        Args:
            original: Original image
            processed: Processed image
            window_size: Size of comparison window
            
        Returns:
            SSIM value (0-1)
        """
        # Normalize images
        if original.max() > 1:
            original = original.astype(np.float32) / 255.0
        if processed.max() > 1:
            processed = processed.astype(np.float32) / 255.0

        # Constants
        c1 = 0.01 ** 2
        c2 = 0.03 ** 2

        # Gaussian kernel
        sigma = 1.5
        kernel_size = window_size
        kernel = cv2.getGaussianKernel(kernel_size, sigma)
        kernel = kernel @ kernel.T

        # Mean values
        mu1 = cv2.filter2D(original, -1, kernel)
        mu2 = cv2.filter2D(processed, -1, kernel)

        # Variance and covariance
        mu1_sq = mu1 ** 2
        mu2_sq = mu2 ** 2
        mu1_mu2 = mu1 * mu2

        sigma1_sq = cv2.filter2D(original**2, -1, kernel) - mu1_sq
        sigma2_sq = cv2.filter2D(processed**2, -1, kernel) - mu2_sq
        sigma12 = cv2.filter2D(original * processed, -1, kernel) - mu1_mu2

        # SSIM
        ssim_map = ((2 * mu1_mu2 + c1) * (2 * sigma12 + c2)) / \
                   ((mu1_sq + mu2_sq + c1) * (sigma1_sq + sigma2_sq + c2))

        return float(np.mean(ssim_map))

    @staticmethod
    def npcr(original: np.ndarray, encrypted: np.ndarray) -> float:
        """
        Calculate Number of Changing Pixel Rate.
        
        Args:
            original: Original image
            encrypted: Encrypted image
            
        Returns:
            NPCR as percentage (0-100)
        """
        if len(original.shape) == 3:
            original = cv2.cvtColor(original, cv2.COLOR_RGB2GRAY)
        if len(encrypted.shape) == 3:
            encrypted = cv2.cvtColor(encrypted, cv2.COLOR_RGB2GRAY)

        # Convert to uint8 if needed
        if original.dtype != np.uint8:
            original = (np.clip(original, 0, 1) * 255).astype(np.uint8)
        if encrypted.dtype != np.uint8:
            encrypted = (np.clip(encrypted, 0, 1) * 255).astype(np.uint8)

        # Count pixels that changed
        diff = np.sum(original != encrypted)
        total = original.size

        npcr = (diff / total) * 100

        return float(npcr)

    @staticmethod
    def uaci(original: np.ndarray, encrypted: np.ndarray) -> float:
        """
        Calculate Unified Average Changing Intensity.
        
        Args:
            original: Original image
            encrypted: Encrypted image
            
        Returns:
            UACI as percentage (0-100)
        """
        if len(original.shape) == 3:
            original = cv2.cvtColor(original, cv2.COLOR_RGB2GRAY)
        if len(encrypted.shape) == 3:
            encrypted = cv2.cvtColor(encrypted, cv2.COLOR_RGB2GRAY)

        # Ensure uint8
        if original.dtype != np.uint8:
            original = (np.clip(original, 0, 1) * 255).astype(np.uint8)
        if encrypted.dtype != np.uint8:
            encrypted = (np.clip(encrypted, 0, 1) * 255).astype(np.uint8)

        # Calculate average absolute difference
        diff = np.abs(original.astype(float) - encrypted.astype(float))
        uaci = (np.mean(diff) / 255) * 100

        return float(uaci)

    @staticmethod
    def compute_all_metrics(
        original: np.ndarray,
        encrypted: np.ndarray
    ) -> Dict[str, float]:
        """
        Compute all security metrics.
        
        Args:
            original: Original image
            encrypted: Encrypted image
            
        Returns:
            Dictionary of metrics
        """
        return {
            "psnr": Metrics.psnr(original, encrypted),
            "ssim": Metrics.ssim(original, encrypted),
            "npcr": Metrics.npcr(original, encrypted),
            "uaci": Metrics.uaci(original, encrypted),
        }


def test_metrics():
    """Test metrics computation."""
    # Create test images
    original = np.random.randint(0, 256, (64, 64), dtype=np.uint8)
    encrypted = np.random.randint(0, 256, (64, 64), dtype=np.uint8)

    metrics = Metrics.compute_all_metrics(original, encrypted)

    print("Metrics:")
    for name, value in metrics.items():
        print(f"  {name}: {value:.4f}")


if __name__ == "__main__":
    test_metrics()
