# Authentication Flow

The Oats Hub uses stateless JWT (JSON Web Token) authentication.

## Token Types

1. **Access Token**: Short-lived token (e.g., 30 minutes) used to authenticate API requests.
2. **Refresh Token**: Long-lived token (e.g., 7 days) used to obtain a new Access Token.

## Login Flow

1. User submits email/password to `POST /api/v1/auth/login`.
2. Backend verifies credentials.
3. Backend returns:
   ```json
   {
     "access_token": "ey...",
     "refresh_token": "ey...",
     "token_type": "bearer"
   }
   ```
4. Frontend `tokenUtils` (`src/lib/token.ts`) stores the tokens securely (preferably in memory or secure localStorage/cookies).

## Authenticated Requests

1. The frontend Axios interceptor (`src/lib/api-client.ts`) attaches the token to the `Authorization` header:
   `Authorization: Bearer <access_token>`
2. Backend `HTTPBearer` dependency parses the token.
3. `get_current_user` dependency verifies the signature, expiration, and extracts the `user_id`.
4. It fetches the active User model from the database and injects it into the route.

## Token Refresh Flow

1. The frontend makes an API request.
2. If the `access_token` is expired, the backend returns a `401 Unauthorized`.
3. The frontend Axios response interceptor catches the `401`.
4. It checks if it has already retried. If not, it pulls the `refresh_token`.
5. It makes a background request to `POST /api/v1/auth/refresh` with the refresh token.
6. If successful, it saves the new `access_token` and `refresh_token`, updates the original request's headers, and resends the request automatically.
7. If the refresh fails (e.g., refresh token expired), it clears local tokens and redirects the user to the login page.

## Admin Authorization

Certain routes are protected by `get_current_admin_user`. This dependency first runs `get_current_user`, and then verifies that the user's `role` property equals `"admin"`. If not, it throws a `403 Forbidden` (`AuthorizationError`).
