"""DNA encoding rules for binary-to-DNA conversion."""

class DNAEncoder:
    """Encode binary data into DNA sequences using various protocols."""

    # DNA encoding protocols (8 rules from the design)
    RULES = {
        1: {"00": "A", "01": "C", "10": "G", "11": "T"},
        2: {"00": "G", "01": "T", "10": "C", "11": "A"},
        3: {"00": "T", "01": "A", "10": "C", "11": "G"},
        4: {"00": "C", "01": "G", "10": "T", "11": "A"},
        5: {"00": "A", "01": "T", "10": "C", "11": "G"},
        6: {"00": "G", "01": "C", "10": "A", "11": "T"},
        7: {"00": "T", "01": "G", "10": "C", "11": "A"},
        8: {"00": "C", "01": "A", "10": "G", "11": "T"},
    }

    # Reverse mappings for decoding
    REVERSE_RULES = {
        i: {v: k for k, v in mapping.items()} for i, mapping in RULES.items()
    }

    # Complements
    COMPLEMENT = {"A": "T", "T": "A", "G": "C", "C": "G"}

    @staticmethod
    def encode(rule: int, binary_string: str) -> str:
        """
        Encode binary string to DNA sequence using specified rule.
        
        Args:
            rule: DNA encoding rule (1-8)
            binary_string: String of 0s and 1s
            
        Returns:
            DNA sequence (string of A, C, G, T)
        """
        if rule not in DNAEncoder.RULES:
            raise ValueError(f"Invalid rule: {rule}")

        mapping = DNAEncoder.RULES[rule]
        dna = []

        # Process binary string in pairs
        for i in range(0, len(binary_string), 2):
            if i + 1 < len(binary_string):
                bits = binary_string[i:i+2]
            else:
                # Pad with 0 if odd length
                bits = binary_string[i] + "0"

            dna.append(mapping.get(bits, "N"))

        return "".join(dna)

    @staticmethod
    def decode(rule: int, dna_string: str) -> str:
        """
        Decode DNA sequence to binary string using specified rule.
        
        Args:
            rule: DNA encoding rule (1-8)
            dna_string: DNA sequence
            
        Returns:
            Binary string
        """
        if rule not in DNAEncoder.REVERSE_RULES:
            raise ValueError(f"Invalid rule: {rule}")

        mapping = DNAEncoder.REVERSE_RULES[rule]
        binary = []

        for base in dna_string:
            binary.append(mapping.get(base, "00"))

        return "".join(binary)

    @staticmethod
    def complement(dna_string: str) -> str:
        """
        Get reverse complement of DNA sequence.
        
        Args:
            dna_string: DNA sequence
            
        Returns:
            Reverse complement
        """
        complement = "".join(
            DNAEncoder.COMPLEMENT.get(base, "N") for base in dna_string
        )
        return complement[::-1]

    @staticmethod
    def xor_strands(strand1: str, strand2: str) -> str:
        """
        XOR two DNA strands and return complemented result.
        
        Args:
            strand1: First DNA sequence
            strand2: Second DNA sequence
            
        Returns:
            XORed and complemented sequence
        """
        # Convert to binary, XOR, convert back
        binary1 = bin(int("".join("01"[c in "AT"] for c in strand1), 2))[2:]
        binary2 = bin(int("".join("01"[c in "AT"] for c in strand2), 2))[2:]

        # Pad to same length
        max_len = max(len(binary1), len(binary2))
        binary1 = binary1.zfill(max_len)
        binary2 = binary2.zfill(max_len)

        # XOR
        xor_result = "".join(
            "0" if b1 == b2 else "1" for b1, b2 in zip(binary1, binary2)
        )

        # Convert back to DNA (rule 1 as default)
        dna_result = DNAEncoder.encode(1, xor_result)
        return DNAEncoder.complement(dna_result)


def test_dna_encoder():
    """Test DNA encoder functionality."""
    # Test encoding
    binary = "0011010110"
    for rule in range(1, 9):
        encoded = DNAEncoder.encode(rule, binary)
        print(f"Rule {rule}: {encoded}")

        # Test decoding
        decoded = DNAEncoder.decode(rule, encoded)
        print(f"  Decoded: {decoded}")


if __name__ == "__main__":
    test_dna_encoder()
