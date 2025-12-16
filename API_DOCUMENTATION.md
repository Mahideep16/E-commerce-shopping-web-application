# 📡 API Documentation - Authentication & Checkout Endpoints

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register New User
```
POST /auth/register
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "addresses": []
  }
}
```

**Error Response (400/500):**
```json
{
  "message": "User already exists"
}
```

---

### 2. Login User
```
POST /auth/login
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "addresses": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "John",
        "lastName": "Doe",
        "phone": "9999999999",
        "addressLine1": "123 Main St",
        "addressLine2": "Apt 4B",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001",
        "country": "India",
        "isDefault": true
      }
    ]
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Get User Profile
```
GET /auth/profile
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "addresses": [],
    "wishlist": [],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "message": "No token provided"
}
```

---

### 4. Update User Profile
```
PUT /auth/profile
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "8888888888"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "8888888888",
    "addresses": [],
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

## 🛒 Order & Checkout Endpoints

### 5. Add Delivery Address
```
POST /orders/addresses
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9999999999",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zipCode": "400001",
  "country": "India",
  "isDefault": true
}
```

**Success Response (201):**
```json
{
  "address": {
    "_id": "507f1f77bcf86cd799439012",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9999999999",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India",
    "isDefault": true
  }
}
```

---

### 6. Get User Addresses
```
GET /orders/addresses
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "addresses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "9999999999",
      "addressLine1": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India",
      "isDefault": true
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "firstName": "Jane",
      "lastName": "Doe",
      "phone": "8888888888",
      "addressLine1": "456 Oak Ave",
      "city": "Bangalore",
      "state": "Karnataka",
      "zipCode": "560001",
      "country": "India",
      "isDefault": false
    }
  ]
}
```

---

### 7. Create Order
```
POST /orders/create
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    {
      "id": "product_1",
      "name": "Blue Casual Shirt",
      "price": 1499,
      "quantity": 2,
      "image": "https://images.unsplash.com/..."
    },
    {
      "id": "product_2",
      "name": "Black Jeans",
      "price": 2499,
      "quantity": 1,
      "image": "https://images.unsplash.com/..."
    }
  ],
  "shippingAddress": {
    "street": "123 Main Street, Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "paymentMethod": "card",
  "subtotal": 5497,
  "tax": 989,
  "shipping": 0,
  "total": 6486
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "id": "product_1",
      "name": "Blue Casual Shirt",
      "price": 1499,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main Street, Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "paymentMethod": "card",
  "paymentDetails": {
    "transactionId": "TXN1234567890",
    "status": "pending",
    "amount": 6486,
    "paymentDate": "2024-01-15T11:30:00Z"
  },
  "orderStatus": "pending",
  "subtotal": 5497,
  "tax": 989,
  "shipping": 0,
  "total": 6486,
  "createdAt": "2024-01-15T11:30:00Z"
}
```

---

### 8. Get User Orders
```
GET /orders/my-orders
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439011",
      "items": [
        {
          "id": "product_1",
          "name": "Blue Casual Shirt",
          "price": 1499,
          "quantity": 2
        }
      ],
      "shippingAddress": {
        "street": "123 Main Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zipCode": "400001"
      },
      "paymentMethod": "card",
      "orderStatus": "pending",
      "total": 6486,
      "createdAt": "2024-01-15T11:30:00Z"
    }
  ]
}
```

---

### 9. Get Order Details
```
GET /orders/:orderId
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
```
orderId: "507f1f77bcf86cd799439014"
```

**Success Response (200):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "id": "product_1",
        "name": "Blue Casual Shirt",
        "price": 1499,
        "quantity": 2,
        "image": "https://images.unsplash.com/..."
      }
    ],
    "shippingAddress": {
      "street": "123 Main Street, Apt 4B",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    },
    "paymentMethod": "card",
    "paymentDetails": {
      "transactionId": "TXN1234567890",
      "status": "pending",
      "amount": 6486,
      "paymentDate": "2024-01-15T11:30:00Z"
    },
    "orderStatus": "pending",
    "subtotal": 5497,
    "tax": 989,
    "shipping": 0,
    "total": 6486,
    "createdAt": "2024-01-15T11:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

### 10. Update Payment Status
```
PUT /orders/:orderId/payment
```

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
```
orderId: "507f1f77bcf86cd799439014"
```

**Request Body:**
```json
{
  "transactionId": "TXN1234567890",
  "status": "completed"
}
```

**Success Response (200):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "paymentDetails": {
      "transactionId": "TXN1234567890",
      "status": "completed",
      "amount": 6486,
      "paymentDate": "2024-01-15T11:35:00Z"
    },
    "orderStatus": "confirmed",
    "updatedAt": "2024-01-15T11:35:00Z"
  }
}
```

---

## 🔄 Common Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```
**Solution**: Include valid JWT in Authorization header

### 400 Bad Request
```json
{
  "message": "Email already exists"
}
```
**Solution**: Check request body for valid data

### 404 Not Found
```json
{
  "message": "Order not found"
}
```
**Solution**: Check orderId is correct

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Internal error details"
}
```
**Solution**: Check backend logs

---

## 🔑 Authentication Token

### Token Format
```
Authorization: Bearer <JWT_TOKEN>
```

### Token Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE3MDUzMzcwMjMsImV4cCI6MTcwNTk0MTgyM30.sWxiSQ3pQZvQxYnC9Q0vq3q2K9p5r8tD2x7y8z0a1b
```

### Token Payload
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1705337023,
  "exp": 1705941823
}
```

**Expiration**: 7 days from issue

---

## 📊 Data Validation

### Email
- Must be valid email format
- Must be unique in database
- Example: `john@example.com`

### Password
- Minimum 6 characters
- Hashed with bcryptjs (salt: 10)
- Example: `password123`

### Phone
- Must be 10 digits (India)
- Numeric only
- Example: `9999999999`

### ZIP Code
- Alphanumeric format
- Example: `400001`

### Order Total Calculation
```
Tax = Subtotal * 0.18 (18% GST)
Shipping = Subtotal > 500 ? 0 : 50
Total = Subtotal + Tax + Shipping
```

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <TOKEN>"
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "card",
    "subtotal": 5497,
    "tax": 989,
    "shipping": 0,
    "total": 6486
  }'
```

---

## 🛡️ Security Headers

All endpoints support:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
CORS: Enabled from frontend origin
```

---

## 📱 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Login successful, data retrieved |
| 201 | Created | User registered, order created |
| 400 | Bad Request | Invalid email, password too short |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Order doesn't exist |
| 500 | Server Error | Database connection failed |

---

**API Version**: 1.0
**Last Updated**: 2024
**Status**: ✅ Complete & Documented
