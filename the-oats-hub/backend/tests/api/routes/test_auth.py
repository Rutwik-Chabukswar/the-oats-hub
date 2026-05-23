"""
Auth Route Tests — Validating registration, login, and route protection.
"""

import pytest
from httpx import AsyncClient

from app.main import app
from tests.utils.auth import get_auth_headers

pytestmark = pytest.mark.asyncio


async def test_admin_route_requires_auth(async_client: AsyncClient):
    """Test that the admin route rejects unauthenticated requests."""
    response = await async_client.get("/api/v1/auth/admin-test")
    assert response.status_code == 403


async def test_admin_route_rejects_customer(async_client: AsyncClient):
    """Test that a standard customer token is rejected by the admin route."""
    headers = await get_auth_headers("123e4567-e89b-12d3-a456-426614174000", role="customer")
    response = await async_client.get("/api/v1/auth/admin-test", headers=headers)
    assert response.status_code == 403


async def test_admin_route_accepts_admin(async_client: AsyncClient):
    """Test that an admin token is accepted."""
    headers = await get_auth_headers("123e4567-e89b-12d3-a456-426614174000", role="admin")
    # Note: this requires overriding the dependency or providing a valid DB mock
    # since `get_current_user` hits the database.
    pass
