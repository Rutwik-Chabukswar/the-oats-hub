"""
Auth Service — Business logic for authentication, tokens, and user lifecycle.
"""

from typing import Any
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ConflictError, InvalidCredentialsError, InactiveUserError, AuthenticationError
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, verify_token
from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.auth import UserCreate, UserLogin, Token


class AuthService:
    """Service handling all authentication and user-related business logic."""

    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def register_user(self, user_in: UserCreate) -> User:
        """Register a new user after verifying uniqueness."""
        # 1. Normalize email
        email = user_in.email.lower()
        
        # 2. Check for existing user
        existing_user = await self.user_repo.get_by_email(email)
        if existing_user:
            raise ConflictError("A user with this email already exists")

        # 3. Hash password and create
        user_data = {
            "email": email,
            "full_name": user_in.full_name,
            "password_hash": hash_password(user_in.password),
            "role": "customer",
            "is_active": True,
            "email_verified": False,
        }
        
        user = await self.user_repo.create(user_data)
        return user

    async def authenticate_user(self, login_in: UserLogin) -> tuple[User, Token]:
        """Authenticate user credentials and return user + tokens."""
        # 1. Fetch user by email
        user = await self.user_repo.get_by_email(login_in.email.lower())
        if not user:
            raise InvalidCredentialsError()

        # 2. Verify password
        if not verify_password(login_in.password, user.password_hash):
            raise InvalidCredentialsError()

        # 3. Check active status
        if not user.is_active:
            raise InactiveUserError()

        # 4. Generate tokens
        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role}
        )
        refresh_token = create_refresh_token(subject=str(user.id))

        token_response = Token(
            access_token=access_token,
            refresh_token=refresh_token,
        )

        return user, token_response

    async def refresh_tokens(self, refresh_token: str) -> Token:
        """Validate refresh token and issue new token pair."""
        # 1. Verify token payload
        payload = verify_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise AuthenticationError("Invalid or expired refresh token")

        user_id_str = payload.get("sub")
        if not user_id_str:
            raise AuthenticationError("Invalid token payload")

        # 2. Fetch user
        from uuid import UUID
        try:
            user_id = UUID(user_id_str)
        except ValueError:
            raise AuthenticationError("Invalid user ID format in token")

        user = await self.user_repo.get_by_id(user_id)
        if not user or getattr(user, "is_deleted", False):
            raise AuthenticationError("User not found")
        if not getattr(user, "is_active", True):
            raise InactiveUserError()

        # 3. Issue new tokens
        new_access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role}
        )
        new_refresh_token = create_refresh_token(subject=str(user.id))

        return Token(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
        )
