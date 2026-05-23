"""
Backend Tests — Test configuration and shared fixtures.
"""

import pytest


@pytest.fixture
def api_base_url() -> str:
    """Base URL for API tests."""
    return "http://localhost:8000/api/v1"
