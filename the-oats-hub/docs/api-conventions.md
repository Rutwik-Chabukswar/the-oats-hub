# API Conventions

This document outlines the strict RESTful API conventions adopted by the backend to ensure consistency.

## Base URL
All API routes are prefixed with: `/api/v1`

## Standardized Responses

All endpoints MUST return a standard wrapper object.

### Success Response
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "Product Name"
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...items],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 20,
    "total_pages": 8
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Field 'email' must be a valid email address."
  ]
}
```

## HTTP Methods

- `GET`: Retrieve resource(s). Safe and idempotent.
- `POST`: Create a new resource. Non-idempotent.
- `PUT`: Fully replace an existing resource. Idempotent.
- `PATCH`: Partially update a resource. 
- `DELETE`: Remove a resource.

## Status Codes

- `200 OK`: Successful GET, PUT, PATCH, DELETE.
- `201 Created`: Successful POST.
- `400 Bad Request`: Validation errors, malformed input.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated, but lacks required permissions (e.g., Admin).
- `404 Not Found`: Resource does not exist.
- `422 Unprocessable Entity`: Pydantic validation errors.
- `500 Internal Server Error`: Unhandled server-side exception.

## Pagination, Filtering, and Sorting

List endpoints use query parameters:
- `?page=1&per_page=20` (Pagination)
- `?sort=-created_at` (Sorting, `-` indicates descending)
- `?category_id=123` (Filtering)
