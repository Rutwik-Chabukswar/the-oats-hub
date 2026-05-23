"""
Application Exceptions — Centralized, typed exception hierarchy.

All custom exceptions must be defined here.
The global exception handler (middleware/exception_handler.py) catches these
and returns standardized error responses.

Usage:
    from app.core.exceptions import NotFoundError, ValidationError

    raise NotFoundError("Product", product_id)
    raise ValidationError("Email is required")
"""


class AppError(Exception):
    """Base exception for all application errors."""

    def __init__(
        self,
        message: str = "An unexpected error occurred",
        status_code: int = 500,
        errors: list[str] | None = None,
    ):
        self.message = message
        self.status_code = status_code
        self.errors = errors or []
        super().__init__(self.message)


class NotFoundError(AppError):
    """Raised when a requested resource is not found."""

    def __init__(self, resource: str = "Resource", identifier: str | None = None):
        detail = f"{resource} not found"
        if identifier:
            detail = f"{resource} with id '{identifier}' not found"
        super().__init__(
            message=detail,
            status_code=404,
            errors=[detail],
        )


class ValidationError(AppError):
    """Raised when input validation fails."""

    def __init__(self, message: str = "Validation failed", errors: list[str] | None = None):
        super().__init__(
            message=message,
            status_code=422,
            errors=errors or [message],
        )


class AuthenticationError(AppError):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Authentication required"):
        super().__init__(
            message=message,
            status_code=401,
            errors=[message],
        )

class InvalidCredentialsError(AuthenticationError):
    """Raised when email or password is incorrect."""

    def __init__(self):
        super().__init__(message="Incorrect email or password")

class AuthorizationError(AppError):
    """Raised when the user lacks permission."""

    def __init__(self, message: str = "You do not have permission to perform this action"):
        super().__init__(
            message=message,
            status_code=403,
            errors=[message],
        )


class InactiveUserError(AuthorizationError):
    """Raised when an inactive user tries to log in or access resources."""

    def __init__(self):
        super().__init__(message="User account is inactive")

class InvalidInventoryError(ValidationError):
    """Raised when an operation would cause invalid inventory states (e.g. negative stock)."""

    def __init__(self, message: str = "Invalid inventory operation"):
        super().__init__(message=message)


class DuplicateSlugError(ConflictError):
    """Raised when a slug collision occurs."""

    def __init__(self, resource: str = "Resource"):
        super().__init__(message=f"A {resource} with this slug already exists")


class DuplicateSKUError(ConflictError):
    """Raised when a SKU collision occurs."""

    def __init__(self, sku: str):
        super().__init__(message=f"A variant with SKU '{sku}' already exists")


class ConflictError(AppError):
    """Raised when a resource conflict occurs (e.g., duplicate email)."""

    def __init__(self, message: str = "Resource already exists"):
        super().__init__(
            message=message,
            status_code=409,
            errors=[message],
        )


class ExternalServiceError(AppError):
    """Raised when an external service (Razorpay, Cloudinary) fails."""

    def __init__(self, service: str, message: str = "External service error"):
        super().__init__(
            message=f"{service}: {message}",
            status_code=502,
            errors=[f"{service}: {message}"],
        )
