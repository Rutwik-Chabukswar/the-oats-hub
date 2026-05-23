"""
Backend Utilities — Shared helper functions.
"""

from datetime import datetime, timezone


def utc_now() -> datetime:
    """Return the current UTC datetime."""
    return datetime.now(timezone.utc)


def paise_to_rupees(paise: int) -> float:
    """Convert paise to rupees."""
    return paise / 100


def rupees_to_paise(rupees: float) -> int:
    """Convert rupees to paise (prices stored in paise)."""
    return int(round(rupees * 100))
