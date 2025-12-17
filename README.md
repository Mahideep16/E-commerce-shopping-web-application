# 🛍️ MAYA - E-Commerce Shopping Web Application

A modern, full-stack e-commerce web application built with React and Node.js, featuring a beautiful UI inspired by leading fashion platforms.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?style=flat&logo=tailwindcss)

## 🌐 Live Demo

- **Frontend:** [https://e-commerce-shopping-web-application-three.vercel.app](https://e-commerce-shopping-web-application-three.vercel.app)
- **Backend API:** [https://maya-e-commerce-api.onrender.com](https://maya-e-commerce-api.onrender.com)

---

## ✨ Features

### 🛒 Shopping Experience
- Browse products by categories (Men, Women, Kids, Accessories, Footwear, Beauty)
- Product filtering and search functionality
- Detailed product pages with size/color selection
- Shopping cart with quantity management
- Wishlist functionality

### 👤 User Authentication
- User registration and login
- JWT-based authentication
- Profile management
- Order history

### 💳 Checkout Flow
- Address management (add, edit, delete)
- Multiple payment options (Card, UPI, COD)
- Order confirmation with details
- Real-time order tracking

### 🎨 UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations with Framer Motion
- Modern gradient designs
- Rising Stars brand carousel
- Category showcase sections

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Library |
| **React Router v6** | Client-side routing |
| **TailwindCSS** | Utility-first CSS framework |
| **Framer Motion** | Animations and transitions |
| **React Icons** | Icon library |
| **Context API** | State management (Cart, Wishlist) |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |

### Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Database hosting |

---

## 📁 Project Structure

```
e-commerce-shopping-web-application/
├── client/                     # React Frontend
│   ├── public/
│   │   ├── assets/            # Product images
│   │   ├── favicon.png        # Site favicon
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Banner.js
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   └── Filters.js
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   ├── PaymentPage.js
│   │   │   ├── Login.js
│   │   │   ├── SignUp.js
│   │   │   └── ProfilePage.js
│   │   ├── context/           # React Context
│   │   │   ├── CartContext.js
│   │   │   └── WishlistContext.js
│   │   ├── config/
│   │   │   └── api.js         # API configuration
│   │   ├── data/
│   │   │   └── products.js    # Product data
│   │   └── styles/
│   │       └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                     # Node.js Backend
│   ├── controllers/
│   │   ├── authController.js
│   │   └── orderController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   └── package.json
│
├── render.yaml                 # Render deployment config
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or Atlas account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahideep16/E-commerce-shopping-web-application.git
   cd E-commerce-shopping-web-application
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=5000
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Run the application**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm start
   ```

5. **Open in browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/create` | Create new order |
| GET | `/api/orders/my-orders` | Get user's orders |
| GET | `/api/orders/addresses` | Get saved addresses |
| POST | `/api/orders/addresses` | Add new address |
| DELETE | `/api/orders/addresses/:id` | Delete address |

---

## 🎨 Screenshots

### Home Page
- Hero banner with promotional content
- Rising Stars brand carousel
- Shop by category section
- New arrivals product grid

### Product Page
- Filter sidebar (category, price, brand)
- Product grid with hover effects
- Quick add to cart/wishlist

### Cart & Checkout
- Cart management
- Address selection
- Payment options
- Order confirmation

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Mahideep**
- GitHub: [@Mahideep16](https://github.com/Mahideep16)

---

## 🙏 Acknowledgments

- Design inspiration from Myntra, Ajio, and other fashion e-commerce platforms
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Images and assets for demonstration purposes

---

<p align="center">Made with ❤️ by Mahideep</p>
