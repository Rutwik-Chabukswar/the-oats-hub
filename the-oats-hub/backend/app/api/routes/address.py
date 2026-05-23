from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.address import AddressCreate, AddressUpdate, AddressResponse
from app.schemas.base import SuccessResponse
from app.services.address import AddressService

router = APIRouter(prefix="/addresses", tags=["addresses"])

@router.get(
    "",
    response_model=SuccessResponse[List[AddressResponse]],
    status_code=status.HTTP_200_OK,
    summary="Get user addresses",
)
async def get_addresses(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = AddressService(session)
    addresses = await service.get_user_addresses(user.id)
    return SuccessResponse(data=addresses)

@router.post(
    "",
    response_model=SuccessResponse[AddressResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create address",
)
async def create_address(
    data: AddressCreate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = AddressService(session)
    address = await service.create_address(user.id, data)
    return SuccessResponse(message="Address created", data=address)

@router.patch(
    "/{address_id}",
    response_model=SuccessResponse[AddressResponse],
    status_code=status.HTTP_200_OK,
    summary="Update address",
)
async def update_address(
    address_id: UUID,
    data: AddressUpdate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = AddressService(session)
    address = await service.update_address(user.id, address_id, data)
    return SuccessResponse(message="Address updated", data=address)

@router.delete(
    "/{address_id}",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    summary="Delete address",
)
async def delete_address(
    address_id: UUID,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    service = AddressService(session)
    await service.delete_address(user.id, address_id)
    return SuccessResponse(message="Address deleted")
