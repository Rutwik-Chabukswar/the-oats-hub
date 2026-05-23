# The Oats Hub — Authentication & Authorization Flow

This document details the exact token lifecycle, authorization architecture, and security boundaries implemented in The Oats Hub backend.

## JWT Lifecycle Architecture

The authentication system employs a secure, stateless two-token architecture designed for mobile and web consumption:

1. **Access Token (Short-lived)**
   - Expiration: `30 minutes` (configured via `JWT_ACCESS_TOKEN_EXPIRE_MINUTES`).
   - Purpose: Authorizes API requests directly. Carries user ID (`sub`) and role (`role`).
   - Storage: In-memory on frontend apps; `HttpOnly` cookie for strictly web.

2. **Refresh Token (Long-lived)**
   - Expiration: `7 days` (configured via `JWT_REFRESH_TOKEN_EXPIRE_DAYS`).
   - Purpose: Exchanged at the `/api/v1/auth/refresh` endpoint to acquire a fresh set of Access and Refresh tokens.
   - Mechanism: When consumed, the system validates the token and the user's current `is_active` status in the DB.

## Route Protection Dependencies

FastAPI's dependency injection system governs endpoint security. Agents must *never* implement custom auth logic inside a route; they must reuse these strictly typed dependencies located in `app.api.dependencies.auth`:

1. **`get_current_user`**
   - Validates the `Bearer` token.
   - Extracts the `sub` (User ID).
   - Fetches the User from the database via `UserRepository`.
   - Rejects missing, deleted, or unauthorized users.

2. **`get_current_active_user`**
   - *Inherits from `get_current_user`*.
   - Rejects the request if `user.is_active == False`.
   - *Default choice for 90% of user-facing routes.*

3. **`get_current_admin_user`**
   - *Inherits from `get_current_active_user`*.
   - Rejects the request if `user.role != "admin"`.
   - *Required for all backend inventory management, CMS operations, and finance tools.*

## Security Hardening
- **Password Safety**: Handled securely via `passlib[bcrypt]`. Plain text is immediately discarded by the `AuthService`.
- **Database Safety**: The `AuthService` handles all lookup checks (`get_by_email`). If an inactive user's token is stolen, the `get_current_active_user` dependency immediately halts all API access.
- **Exception Normalization**: Missing tokens, expired tokens, and wrong passwords all emit normalized `{"success": false}` API responses without leaking internal stack traces, controlled entirely by the `app.core.exceptions` hierarchy.
