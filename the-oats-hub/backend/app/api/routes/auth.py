"""
Auth Routes — Endpoints for registration, login, and token management.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_active_user, get_current_admin_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UserCreate, UserUpdate, UserLogin, UserResponse, Token, RefreshTokenRequest
from app.schemas.base import SuccessResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=SuccessResponse[UserResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
async def register(
    user_in: UserCreate,
    session: AsyncSession = Depends(get_db),
):
    """Register a new customer account."""
    auth_service = AuthService(session)
    user = await auth_service.register_user(user_in)
    return SuccessResponse(message="User registered successfully", data=user)


@router.post(
    "/login",
    response_model=SuccessResponse[Token],
    status_code=status.HTTP_200_OK,
    summary="Login user and return tokens",
)
async def login(
    login_in: UserLogin,
    session: AsyncSession = Depends(get_db),
):
    """Authenticate user and return access & refresh tokens."""
    auth_service = AuthService(session)
    _, token = await auth_service.authenticate_user(login_in)
    return SuccessResponse(message="Login successful", data=token)


@router.post(
    "/refresh",
    response_model=SuccessResponse[Token],
    status_code=status.HTTP_200_OK,
    summary="Refresh access tokens",
)
async def refresh_tokens(
    request: RefreshTokenRequest,
    session: AsyncSession = Depends(get_db),
):
    """Exchange a valid refresh token for a new pair of access/refresh tokens."""
    auth_service = AuthService(session)
    token = await auth_service.refresh_tokens(request.refresh_token)
    return SuccessResponse(message="Tokens refreshed successfully", data=token)


@router.get(
    "/me",
    response_model=SuccessResponse[UserResponse],
    status_code=status.HTTP_200_OK,
    summary="Get current user profile",
)
async def get_my_profile(
    current_user: User = Depends(get_current_active_user),
):
    """Return the profile of the currently authenticated active user."""
    return SuccessResponse(data=current_user)

@router.patch(
    "/me",
    response_model=SuccessResponse[UserResponse],
    status_code=status.HTTP_200_OK,
    summary="Update current user profile",
)
async def update_my_profile(
    update_data: UserUpdate,
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Update profile details of the currently authenticated user."""
    if update_data.full_name is not None:
        current_user.full_name = update_data.full_name
    if update_data.email is not None:
        current_user.email = update_data.email
        
    await session.commit()
    await session.refresh(current_user)
    
    return SuccessResponse(message="Profile updated successfully", data=current_user)


@router.get(
    "/admin-test",
    response_model=SuccessResponse[dict[str, str]],
    status_code=status.HTTP_200_OK,
    summary="Test admin authorization",
)
async def admin_test_route(
    current_user: User = Depends(get_current_admin_user),
):
    """Test route protected by the get_current_admin_user dependency."""
    return SuccessResponse(data={"message": "You have administrative access", "email": str(current_user.email)})
