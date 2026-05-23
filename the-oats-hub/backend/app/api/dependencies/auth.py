"""
Auth Dependencies — Dependency injection for route protection.
"""

from uuid import UUID
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AuthenticationError, InactiveUserError, AuthorizationError
from app.core.security import verify_token
from app.db.session import get_db
from app.models.user import User
from app.repositories.user import UserRepository

security_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    session: AsyncSession = Depends(get_db),
) -> User:
    """
    Dependency: Validate token and fetch the current user.
    Raises AuthenticationError if token is invalid or user doesn't exist.
    """
    payload = verify_token(credentials.credentials)
    if not payload or payload.get("type") != "access":
        raise AuthenticationError("Invalid or expired access token")

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise AuthenticationError("Token missing subject")

    try:
        user_id = UUID(user_id_str)
    except ValueError:
        raise AuthenticationError("Invalid user ID in token")

    user_repo = UserRepository(session)
    user = await user_repo.get_by_id(user_id)
    
    if not user or getattr(user, "is_deleted", False):
        raise AuthenticationError("User not found")

    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Dependency: Ensure the current user is active.
    Raises InactiveUserError if not.
    """
    if not getattr(current_user, "is_active", True):
        raise InactiveUserError()
    return current_user


async def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    """
    Dependency: Ensure the current user has 'admin' role.
    Raises AuthorizationError if not.
    """
    if getattr(current_user, "role", "customer") != "admin":
        raise AuthorizationError("Admin privileges required")
    return current_user
