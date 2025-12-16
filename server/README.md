# ShopHub Backend - API Documentation

## Overview
RESTful API built with Express.js and MongoDB for the ShopHub e-commerce platform.

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Products
- `GET /api/products` - List all products with filters
  - Query params: `category`, `brand`, `minPrice`, `maxPrice`, `search`, `sort`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/add/:userId` - Add item to cart
- `DELETE /api/cart/remove/:userId/:itemId` - Remove item from cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:userId` - Get user orders

## Database Schema

### Product
- name: String (required)
- description: String
- price: Number
- originalPrice: Number
- discount: Number (0-100)
- category: Enum (Men, Women, Kids, Accessories, Footwear, Beauty)
- brand: String
- rating: Number (0-5)
- reviews: Number
- images: [String]
- sizes: [String]
- colors: [String]
- stock: Number
- isNew: Boolean
- isFeatured: Boolean

### User
- name: String (required)
- email: String (required, unique)
- password: String (hashed)
- phone: String
- addresses: [Object]
- wishlist: [ObjectId]

### Cart
- userId: ObjectId (required)
- items: [Object]
  - productId: ObjectId
  - quantity: Number
  - size: String
  - color: String
  - price: Number
- totalPrice: Number

### Order
- userId: ObjectId
- items: [Object]
- totalPrice: Number
- shippingAddress: Object
- status: Enum (pending, confirmed, shipped, delivered, cancelled)
- paymentStatus: Enum (pending, completed, failed)
- paymentMethod: String

## Error Handling

All endpoints return standard error responses:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Future Additions

- JWT middleware for route protection
- Input validation with express-validator
- Rate limiting
- Pagination for product listings
- Image upload functionality
- Payment gateway integration
