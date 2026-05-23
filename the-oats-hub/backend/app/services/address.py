import uuid
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.address import Address
from app.schemas.address import AddressCreate, AddressUpdate
from app.core.exceptions import NotFoundError, ForbiddenError

class AddressService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_user_addresses(self, user_id: uuid.UUID) -> List[Address]:
        stmt = select(Address).where(Address.user_id == user_id).order_by(Address.created_at.desc())
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def create_address(self, user_id: uuid.UUID, data: AddressCreate) -> Address:
        # If is_default, unset others
        if data.is_default:
            await self._unset_defaults(user_id)
            
        address = Address(user_id=user_id, **data.model_dump())
        self.session.add(address)
        await self.session.commit()
        await self.session.refresh(address)
        return address

    async def update_address(self, user_id: uuid.UUID, address_id: uuid.UUID, data: AddressUpdate) -> Address:
        address = await self._get_address_or_404(address_id, user_id)
        
        update_data = data.model_dump(exclude_unset=True)
        
        if update_data.get('is_default'):
            await self._unset_defaults(user_id, exclude_id=address_id)
            
        for key, value in update_data.items():
            setattr(address, key, value)
            
        await self.session.commit()
        await self.session.refresh(address)
        return address

    async def delete_address(self, user_id: uuid.UUID, address_id: uuid.UUID) -> None:
        address = await self._get_address_or_404(address_id, user_id)
        await self.session.delete(address)
        await self.session.commit()

    async def _unset_defaults(self, user_id: uuid.UUID, exclude_id: uuid.UUID = None):
        stmt = select(Address).where(Address.user_id == user_id, Address.is_default == True)
        if exclude_id:
            stmt = stmt.where(Address.id != exclude_id)
        result = await self.session.execute(stmt)
        for addr in result.scalars().all():
            addr.is_default = False
            
    async def _get_address_or_404(self, address_id: uuid.UUID, user_id: uuid.UUID) -> Address:
        stmt = select(Address).where(Address.id == address_id)
        result = await self.session.execute(stmt)
        address = result.scalar_one_or_none()
        
        if not address:
            raise NotFoundError("Address", str(address_id))
            
        if address.user_id != user_id:
            raise ForbiddenError("You do not have permission to access this address.")
            
        return address
