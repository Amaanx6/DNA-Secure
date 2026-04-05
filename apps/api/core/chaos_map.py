"""Chaotic map functions for image scrambling."""

import numpy as np


class ChaosMap:
    """Generate and apply chaotic maps for image encryption."""

    @staticmethod
    def logistic_sequence(r: float = 3.99, x0: float = 0.5, length: int = 1000) -> np.ndarray:
        """
        Generate logistic map sequence.
        
        Args:
            r: Logistic map parameter (3.99 for chaotic region)
            x0: Initial value
            length: Sequence length
            
        Returns:
            Array of logistic map values
        """
        sequence = np.zeros(length)
        x = x0

        for i in range(length):
            x = r * x * (1 - x)
            sequence[i] = x

        return sequence

    @staticmethod
    def arnold_cat_map(
        image: np.ndarray,
        iterations: int = 1
    ) -> np.ndarray:
        """
        Apply Arnold cat map transformation.
        
        Args:
            image: Input image array
            iterations: Number of iterations
            
        Returns:
            Transformed image
        """
        h, w = image.shape[:2]
        result = image.copy()

        for _ in range(iterations):
            # Arnold cat map transformation
            # (x, y) -> (x + y, x + 2y) mod (h, w)
            transformed = np.zeros_like(result)

            for y in range(h):
                for x in range(w):
                    new_x = (x + y) % w
                    new_y = (x + 2 * y) % h
                    transformed[new_y, new_x] = result[y, x]

            result = transformed

        return result

    @staticmethod
    def inverse_arnold_cat_map(
        image: np.ndarray,
        iterations: int = 1
    ) -> np.ndarray:
        """
        Apply inverse Arnold cat map transformation.
        
        Args:
            image: Input image array
            iterations: Number of iterations
            
        Returns:
            Transformed image
        """
        h, w = image.shape[:2]
        result = image.copy()

        for _ in range(iterations):
            # Inverse Arnold cat map transformation
            # (x, y) -> (2x - y, -x + y) mod (h, w)
            transformed = np.zeros_like(result)

            for y in range(h):
                for x in range(w):
                    new_x = (2 * x - y) % w
                    new_y = (-x + y) % h
                    transformed[new_y, new_x] = result[y, x]

            result = transformed

        return result

    @staticmethod
    def apply_chaotic_encryption(
        image: np.ndarray,
        key: int = 12345,
        method: str = "arnold"
    ) -> np.ndarray:
        """
        Apply chaotic encryption to image.
        
        Args:
            image: Input image
            key: Encryption key
            method: "arnold" or "logistic"
            
        Returns:
            Encrypted image
        """
        if method == "arnold":
            # Use key modulo to determine iterations
            iterations = (key % 10) + 1
            return ChaosMap.arnold_cat_map(image, iterations)

        elif method == "logistic":
            # Generate logistic sequence from key
            sequence = ChaosMap.logistic_sequence(
                r=3.99,
                x0=key % 1.0,
                length=image.size
            )

            # Apply scrambling based on sequence
            scrambled = image.copy().flatten()
            indices = np.argsort(sequence)
            scrambled = scrambled[indices]

            if len(image.shape) == 3:
                return scrambled.reshape(image.shape)
            else:
                return scrambled.reshape(image.shape)

        else:
            raise ValueError(f"Unknown method: {method}")

    @staticmethod
    def apply_chaotic_decryption(
        image: np.ndarray,
        key: int = 12345,
        method: str = "arnold"
    ) -> np.ndarray:
        """
        Decrypt image encrypted with chaotic encryption.
        
        Args:
            image: Encrypted image
            key: Encryption key
            method: "arnold" or "logistic"
            
        Returns:
            Decrypted image
        """
        if method == "arnold":
            # Use key modulo to determine iterations (inverse)
            iterations = (key % 10) + 1
            return ChaosMap.inverse_arnold_cat_map(image, iterations)

        elif method == "logistic":
            # Reverse scrambling
            sequence = ChaosMap.logistic_sequence(
                r=3.99,
                x0=key % 1.0,
                length=image.size
            )

            scrambled = image.copy().flatten()
            # Unsort using argsort indices
            indices = np.argsort(sequence)
            unscrambled = np.empty_like(scrambled)
            unscrambled[indices] = scrambled

            if len(image.shape) == 3:
                return unscrambled.reshape(image.shape)
            else:
                return unscrambled.reshape(image.shape)

        else:
            raise ValueError(f"Unknown method: {method}")


def test_chaos_map():
    """Test chaos map functions."""
    # Create test image
    image = np.random.randint(0, 256, (32, 32), dtype=np.uint8)

    # Test Arnold cat map
    encrypted = ChaosMap.arnold_cat_map(image, iterations=3)
    decrypted = ChaosMap.inverse_arnold_cat_map(encrypted, iterations=3)

    print(f"Original image shape: {image.shape}")
    print(f"Encrypted image shape: {encrypted.shape}")
    print(f"Decrypted matches original: {np.allclose(image, decrypted)}")

    # Test logistic sequence
    sequence = ChaosMap.logistic_sequence(length=100)
    print(f"Logistic sequence shape: {sequence.shape}")
    print(f"Logistic sequence range: {sequence.min():.3f} - {sequence.max():.3f}")


if __name__ == "__main__":
    test_chaos_map()
