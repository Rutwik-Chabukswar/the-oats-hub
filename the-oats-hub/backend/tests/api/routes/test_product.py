"""
Product Route Tests — Validating catalog APIs and filtering logic.
"""

import pytest
from httpx import AsyncClient

from tests.utils.auth import get_auth_headers

pytestmark = pytest.mark.asyncio


async def test_list_products_public(async_client: AsyncClient):
    """Test that listing products is publicly accessible and returns standardized pagination."""
    response = await async_client.get("/api/v1/products")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert "total" in data
    assert "page" in data


async def test_create_product_requires_admin(async_client: AsyncClient):
    """Test that creating a product without an admin token fails."""
    # 1. No token
    response = await async_client.post("/api/v1/products", json={"name": "Test"})
    assert response.status_code == 403 or response.status_code == 401

    # 2. Customer token
    headers = await get_auth_headers("123e4567-e89b-12d3-a456-426614174000", role="customer")
    response = await async_client.post("/api/v1/products", json={"name": "Test"}, headers=headers)
    assert response.status_code == 403
