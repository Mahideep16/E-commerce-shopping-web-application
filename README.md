# ShopHub - Myntra-like E-Commerce Platform

A full-stack e-commerce web application with a modern, responsive design inspired by Myntra. Features smooth animations, intuitive UI, and a complete shopping experience.

## 🎯 Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for engaging interactions
- **Product Browsing**: Grid view with filters and sorting
- **Shopping Cart**: Add/remove items with quantity management
- **Modern UI**: Clean, minimalist design inspired by Myntra
- **Real-time Updates**: Cart state management using Context API

### Backend
- **RESTful API**: Express.js server with modular route structure
- **Database**: MongoDB for products, users, orders, and cart data
- **Authentication**: JWT-based authentication system
- **User Management**: User registration, login, and profile management
- **Product Management**: CRUD operations for products
- **Order Management**: Order creation and tracking

### Animations & Effects
- Hover effects on product cards
- Fade-in animations on scroll
- Smooth page transitions
- Button ripple effects
- Banner auto-rotation
- Cart item animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

#### 1. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
NODE_ENV=development
```

Start MongoDB and run the server:
```bash
npm run dev
```

#### 2. Frontend Setup
```bash
cd client
npm install
```

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
web app/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── ProductCard.js
│   │   │   ├── Filters.js
│   │   │   ├── Banner.js
│   │   │   ├── Features.js
│   │   │   └── Footer.js
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── CartPage.js
│   │   │   └── NotFoundPage.js
│   │   ├── context/         # Global state
│   │   │   └── CartContext.js
│   │   ├── styles/          # CSS files
│   │   │   └── index.css
│   │   ├── App.js           # Main app component
│   │   └── index.js         # React DOM root
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/                    # Node.js/Express backend
    ├── models/              # MongoDB schemas
    │   ├── Product.js
    │   ├── User.js
    │   ├── Cart.js
    │   └── Order.js
    ├── routes/              # API routes
    │   ├── productRoutes.js
    │   ├── authRoutes.js
    │   ├── cartRoutes.js
    │   └── orderRoutes.js
    ├── controllers/         # Route handlers
    ├── middlewares/         # Custom middlewares
    ├── server.js            # Main server file
    ├── package.json
    └── .env
```

## 🎨 Design Details

### Colors
- **Primary**: #EE5A6F (Pink/Red)
- **Secondary**: #FDB913 (Yellow)
- **Dark**: #1a1a1a
- **Light**: #f5f5f5

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800, 900

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📦 Dependencies

### Frontend
- React 18.2.0
- React Router DOM 6.10.0
- Axios 1.3.4
- Framer Motion 10.10.0
- React Icons 4.8.0
- Tailwind CSS 3.2.7

### Backend
- Express 4.18.2
- Mongoose 7.0.0
- CORS 2.8.5
- Bcryptjs 2.4.3
- JsonWebToken 9.0.0

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/add/:userId` - Add to cart
- `DELETE /api/cart/remove/:userId/:itemId` - Remove from cart

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/:userId` - Get user orders

## 🎭 Component Overview

### Header
- Navigation bar with search functionality
- Shopping cart counter
- User profile link
- Mobile responsive menu

### ProductCard
- Product image with hover zoom
- Price and discount display
- Rating and reviews
- Quick add to cart button
- Wishlist button

### Banner
- Auto-rotating promotional banners
- Call-to-action buttons
- Smooth transitions

### Filters
- Category filtering
- Brand filtering
- Price range filtering
- Rating filtering
- Expandable filter sections

### Cart
- Item management with quantity controls
- Price calculations
- Remove item functionality
- Order summary
- Checkout button

## 🚀 Future Enhancements

- [ ] Product detail page
- [ ] User profile and address management
- [ ] Wishlist functionality
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Search functionality
- [ ] Size and color selection
- [ ] Delivery address management

## 🛠️ Development Tips

### Adding a New Component
1. Create component file in `src/components/`
2. Import and use in pages or other components
3. Add styling using Tailwind classes

### Adding a New Page
1. Create page file in `src/pages/`
2. Add route in `App.js`
3. Create link in navigation if needed

### Adding API Endpoints
1. Create route file in `server/routes/`
2. Create controller functions in `server/controllers/`
3. Import route in `server.js`

## 📝 Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
NODE_ENV=development
```

## 🐛 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running locally or provide a valid connection string
- Check `MONGODB_URI` in `.env` file

### CORS Issues
- Ensure backend is running on correct port
- Check CORS middleware in `server.js`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001 npm start` or change port 3000

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first design approach
- Breakpoints for tablet and desktop
- Touch-friendly buttons and inputs
- Optimized images for different screen sizes

## 🎯 Performance Optimizations

- Lazy loading of components
- Optimized animations with Framer Motion
- CSS minification with Tailwind
- Image optimization
- Code splitting with React Router

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a full-stack e-commerce learning project.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

Made with ❤️ for the web development community
