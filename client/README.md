# ShopHub Frontend - React E-Commerce UI

## Overview
Modern, responsive React frontend for the ShopHub e-commerce platform with Myntra-inspired design.

## Installation

```bash
npm install
```

## Running the App

Development server:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Features

### Pages
- **Home Page**: Featured collection, banner carousel, new arrivals
- **Products Page**: Product grid with filters and sorting
- **Cart Page**: Shopping cart with quantity management
- **404 Page**: Not found error page

### Components
- **Header**: Navigation, search, cart icon, user menu
- **ProductCard**: Product display with price, discount, rating
- **Filters**: Category, brand, price, rating filters
- **Banner**: Auto-rotating promotional banners
- **Features**: Why choose us section
- **Footer**: Footer with links and social icons

### Features
- Smooth scroll animations with Framer Motion
- Product filtering and sorting
- Shopping cart with localStorage persistence
- Responsive mobile design
- Search functionality
- Rating and reviews display
- Quick actions on product cards

## Context API

### CartContext
Manages global shopping cart state:
- `cartItems`: Array of products in cart
- `addToCart()`: Add product to cart
- `removeFromCart()`: Remove product from cart
- `updateQuantity()`: Update item quantity
- `getTotalPrice()`: Calculate total cart price
- `getTotalItems()`: Get total item count
- `user`: Current logged-in user

## Styling

### Tailwind CSS
Complete styling using Tailwind utility classes with custom configuration:
- Custom colors (primary, secondary)
- Custom animations
- Responsive breakpoints

### Custom CSS
- Global styles in `src/styles/index.css`
- Scrollbar styling
- Button animations
- Image transitions

## Component Structure

```
App.js (Router setup)
├── Header (Navigation)
├── Routes
│   ├── HomePage
│   │   ├── Banner
│   │   ├── ProductCard (multiple)
│   │   └── Features
│   ├── ProductsPage
│   │   ├── Filters
│   │   └── ProductCard (grid)
│   └── CartPage
├── Footer
└── CartProvider (Context)
```

## Key Dependencies

- **React 18**: UI library
- **React Router**: Client-side routing
- **Framer Motion**: Animations
- **Axios**: HTTP client (ready for API integration)
- **React Icons**: Icon library
- **Tailwind CSS**: Utility CSS framework

## Configuration Files

### `tailwind.config.js`
- Custom color definitions
- Custom animations
- Breakpoint configuration

### `postcss.config.js`
- Tailwind CSS processing
- Autoprefixer support

## Performance

- Component-level code splitting
- Image lazy loading ready
- Optimized animations
- Minimal re-renders with Context API

## Development Practices

- Functional components with hooks
- Context API for state management
- Component composition
- Mobile-first responsive design
- Accessibility considerations

## Future Enhancements

- [ ] Product detail page with specs
- [ ] User authentication pages
- [ ] Wishlist page
- [ ] Order confirmation page
- [ ] Payment page
- [ ] User profile management
- [ ] Product reviews section
- [ ] Live search with autocomplete
- [ ] Size and color picker
- [ ] Admin dashboard

## API Integration

Ready for backend integration:
- Update API endpoints in components
- Replace mock data with API calls
- Add loading and error states
- Implement authentication tokens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. Use React DevTools Profiler to identify slow components
2. Implement code splitting for routes
3. Use image optimization libraries
4. Monitor bundle size with `npm run build`
5. Use `React.memo()` for frequently re-rendered components

---

For more information, check the main README.md in the project root.
