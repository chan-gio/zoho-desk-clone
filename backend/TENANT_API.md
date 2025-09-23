# Tenant API Documentation

## Overview
API endpoints for managing tenants in the Zoho Desk system.

## Base URL
```
/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All Tenants
**GET** `/tenants`

Get a paginated list of all tenants.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by tenant name

**Response:**
```json
{
  "success": true,
  "data": {
    "tenants": [
      {
        "id": "uuid",
        "name": "Company Name",
        "description": "Company description",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "_count": {
          "users": 10,
          "tickets": 50,
          "departments": 3,
          "slas": 2,
          "workflows": 1
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  },
  "message": "Tenants retrieved successfully"
}
```

### 2. Get Tenant by ID
**GET** `/tenants/:id`

Get a specific tenant by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Company Name",
    "description": "Company description",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "users": [
      {
        "id": "uuid",
        "username": "admin",
        "email": "admin@company.com",
        "role": "admin",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "departments": [
      {
        "id": "uuid",
        "name": "Technical Support",
        "description": "Technical support department",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "_count": {
      "users": 10,
      "tickets": 50,
      "departments": 3,
      "slas": 2,
      "workflows": 1
    }
  },
  "message": "Tenant retrieved successfully"
}
```

### 3. Get Tenants by User ID
**GET** `/users/:userId/tenants`

Get all tenants associated with a specific user.

**Path Parameters:**
- `userId`: User ID

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "tenants": [
      {
        "id": "uuid",
        "name": "Company Name",
        "description": "Company description",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  },
  "message": "Tenants retrieved successfully"
}
```

### 4. Create Tenant
**POST** `/tenants`

Create a new tenant. (Admin only)

**Request Body:**
```json
{
  "name": "New Company",
  "description": "Company description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Company",
    "description": "Company description",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Tenant created successfully"
}
```

### 5. Update Tenant
**PUT** `/tenants/:id`

Update an existing tenant. (Admin only)

**Request Body:**
```json
{
  "name": "Updated Company Name",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Company Name",
    "description": "Updated description",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Tenant updated successfully"
}
```

### 6. Delete Tenant
**DELETE** `/tenants/:id`

Delete a tenant. (Admin only)

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Tenant deleted successfully"
}
```

### 7. Get Tenant Statistics
**GET** `/tenants/:id/stats`

Get statistics for a specific tenant. (Admin/Agent only)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "totalTickets": 50,
    "totalDepartments": 3,
    "totalSLAs": 2,
    "totalWorkflows": 1,
    "activeTickets": 15,
    "closedTickets": 35,
    "recentActivity": [
      {
        "id": "uuid",
        "title": "Ticket Title",
        "status": "open",
        "priority": "high",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "creator": {
          "username": "user1",
          "email": "user1@company.com"
        },
        "assignee": {
          "username": "agent1",
          "email": "agent1@company.com"
        }
      }
    ]
  },
  "message": "Tenant statistics retrieved successfully"
}
```

### 8. Add User to Tenant
**POST** `/tenants/:tenantId/users`

Add a user to a tenant. (Admin only)

**Request Body:**
```json
{
  "userId": "user-uuid",
  "role": "agent"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "username": "user1",
    "email": "user1@company.com",
    "role": "agent",
    "tenantId": "tenant-uuid",
    "isActive": true
  },
  "message": "User added to tenant successfully"
}
```

### 9. Remove User from Tenant
**DELETE** `/tenants/:tenantId/users`

Remove a user from a tenant. (Admin only)

**Request Body:**
```json
{
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "username": "user1",
    "email": "user1@company.com",
    "role": "customer",
    "tenantId": null,
    "deletedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User removed from tenant successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Tenant ID is required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Tenant not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Usage Examples

### Get all tenants with pagination
```bash
curl -X GET "http://localhost:8000/api/tenants?page=1&limit=5" \
  -H "Authorization: Bearer your-jwt-token"
```

### Get tenants by user ID
```bash
curl -X GET "http://localhost:8000/api/users/user-uuid/tenants" \
  -H "Authorization: Bearer your-jwt-token"
```

### Create a new tenant
```bash
curl -X POST "http://localhost:8000/api/tenants" \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Company",
    "description": "A new company tenant"
  }'
```

### Get tenant statistics
```bash
curl -X GET "http://localhost:8000/api/tenants/tenant-uuid/stats" \
  -H "Authorization: Bearer your-jwt-token"
```
