"""
String utilities — Helpers for URL generation, slugs, and text parsing.
"""

import re
import unicodedata


def generate_slug(text: str) -> str:
    """
    Generate an SEO-friendly slug from a string.
    
    1. Normalizes unicode characters (e.g. 'é' -> 'e').
    2. Lowercases the string.
    3. Replaces non-alphanumeric characters with hyphens.
    4. Strips leading and trailing hyphens.
    """
    # Normalize unicode to ASCII
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    # Convert to lowercase
    text = text.lower()
    # Replace non-alphanumeric characters with hyphens
    text = re.sub(r"[^\w\s-]", "", text)
    # Replace spaces and multiple hyphens with a single hyphen
    text = re.sub(r"[-\s]+", "-", text)
    # Strip leading and trailing hyphens
    return text.strip("-")
