"""
Auth Test Utilities — Helpers for testing authentication flows.
"""

from httpx import AsyncClient
from app.core.security import create_access_token


async def get_test_user_token(user_id: str, role: str = "customer") -> str:
    """Generate a valid mock access token for testing protected routes."""
    return create_access_token(
        subject=user_id,
        extra_claims={"role": role}
    )


async def get_auth_headers(user_id: str, role: str = "customer") -> dict[str, str]:
    """Return authorization headers for a mock user."""
    token = await get_test_user_token(user_id, role)
    return {"Authorization": f"Bearer {token}"}
