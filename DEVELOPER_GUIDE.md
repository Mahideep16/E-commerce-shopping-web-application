# ShopHub Developer Guide - Quick Tips & Patterns

## 🚀 Getting Started

### Development Environment
```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm start

# Build for production
npm run build

# Start backend server (port 5000)
node server.js
```

### Project Structure
```
web app/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API
│   │   ├── styles/       # Global styles
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   ├── public/           # Static files
│   ├── build/            # Production build
│   └── package.json      # Dependencies
├── server/               # Express backend
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── server.js         # Server entry point
│   └── package.json      # Dependencies
└── package.json          # Root package.json
```

---

## 💡 Common Patterns

### 1. Responsive Layout
```jsx
// Always use responsive classes
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

### 2. Conditional Classes
```jsx
// Use ternary or classnames library
<div className={`p-4 ${isActive ? 'bg-primary text-white' : 'bg-gray-100'}`}>
  Content
</div>
```

### 3. Card Component
```jsx
<div className="card p-4 hover:shadow-lg">
  <h3 className="font-bold mb-2">Title</h3>
  <p className="text-gray-600 text-sm">Description</p>
</div>
```

### 4. Button Variations
```jsx
// Primary
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
  Primary
</button>

// Secondary
<button className="bg-secondary text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400">
  Secondary
</button>

// Ghost
<button className="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10">
  Ghost
</button>
```

### 5. Mobile Menu
```jsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
      Menu
    </button>
    
    <div className="hidden lg:flex">Desktop nav</div>
    
    {isOpen && <div className="lg:hidden">Mobile nav</div>}
  </>
);
```

### 6. Form Input
```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
/>
```

### 7. Link/Navigation
```jsx
<Link
  to="/page"
  className="text-primary hover:text-pink-700 transition duration-300 font-semibold relative group"
>
  Link Text
  {/* Animated underline */}
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
</Link>
```

### 8. Loading State
```jsx
{loading ? (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
) : (
  <div>{content}</div>
)}
```

### 9. Error Message
```jsx
{error && (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700">
    <p className="font-bold">Error</p>
    <p className="text-sm">{error}</p>
  </div>
)}
```

### 10. Success Message
```jsx
{success && (
  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-green-700">
    <p className="font-bold">Success!</p>
    <p className="text-sm">{success}</p>
  </div>
)}
```

---

## 🎯 Best Practices

### 1. Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyComponent = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Setup code
    return () => {
      // Cleanup code
    };
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handle click
  };

  // Render
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Heading</h1>
      <p>Content</p>
    </div>
  );
};

export default MyComponent;
```

### 2. Use Context for Global State
```jsx
// Context
const MyContext = React.createContext();

export const MyProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Use within provider');
  return context;
};

// Usage
const MyComponent = () => {
  const { data, setData } = useMyContext();
  // ...
};
```

### 3. Reusable Components
```jsx
// Card Component
const Card = ({ title, description, children, className }) => (
  <div className={`card p-4 ${className}`}>
    {title && <h3 className="font-bold mb-2">{title}</h3>}
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);

// Button Component
const Button = ({ variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-gray-900 hover:bg-yellow-400',
    ghost: 'border-2 border-primary text-primary hover:bg-primary/10',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition duration-300 ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 4. Proper Error Handling
```jsx
const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{/* Content */}</div>;
};
```

### 5. Performance Optimization
```jsx
import { useMemo, useCallback } from 'react';

const MyComponent = ({ items }) => {
  // Memoize expensive computations
  const processedItems = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  // Memoize callbacks to prevent re-renders
  const handleClick = useCallback((id) => {
    // Handle click
  }, []);

  return (
    <div>
      {processedItems.map(item => (
        <Item key={item.id} onClick={() => handleClick(item.id)} />
      ))}
    </div>
  );
};
```

---

## 🎨 Styling Tips

### 1. Responsive Spacing
```jsx
// Small screens: px-3, large: px-8
<div className="px-3 md:px-8">Content</div>

// Stacking on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

### 2. Dynamic Classes
```jsx
const className = `
  p-4 rounded-lg transition duration-300
  ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'}
  ${isHovered ? 'shadow-lg' : 'shadow-md'}
`;
```

### 3. CSS Variables (Advanced)
```css
/* In index.css */
:root {
  --primary: #EE5A6F;
  --secondary: #FDB913;
  --radius: 0.5rem;
}

/* In component */
<div style={{ backgroundColor: 'var(--primary)' }} />
```

### 4. Pseudo-Elements
```jsx
// Animated underline on hover
<a className="relative group">
  Link
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
</a>
```

---

## 📱 Mobile Testing Checklist

### Screen Sizes to Test
- [x] 320px (iPhone SE)
- [x] 375px (iPhone X)
- [x] 480px (Android)
- [x] 640px (iPad Mini)
- [x] 768px (iPad)
- [x] 1024px (iPad Pro)
- [x] 1280px (Desktop)
- [x] 1536px (Large Desktop)

### Things to Check
- [ ] Text is readable (min 12px)
- [ ] Buttons are tappable (min 44px)
- [ ] Images load properly
- [ ] Spacing is consistent
- [ ] Overflow is handled
- [ ] Forms work on mobile
- [ ] Navigation is accessible
- [ ] Animations perform smoothly

---

## 🐛 Debugging Tips

### React DevTools
```bash
# Install React DevTools extension
# View component hierarchy, state, props
# Track re-renders and performance
```

### Console Debugging
```jsx
// Log state changes
useEffect(() => {
  console.log('State updated:', state);
}, [state]);

// Debug API calls
fetch(url)
  .then(res => {
    console.log('Response:', res);
    return res.json();
  })
  .catch(err => console.error('Error:', err));
```

### Performance Profiling
```jsx
// In React DevTools Profiler
// Record interactions
// Identify slow renders
// Check component update reasons
```

---

## 📚 Common Issues & Solutions

### Issue: Styles not applying
**Solution**: 
- Check class names (lowercase with hyphens)
- Verify Tailwind CSS is imported
- Check specificity in custom CSS
- Clear browser cache

### Issue: Responsive classes not working
**Solution**:
- Use correct breakpoint syntax: `md:`, `lg:`
- Remember mobile-first approach
- Check Tailwind config
- Don't use arbitrary values without bracket notation

### Issue: Images not loading
**Solution**:
- Check image URL is correct
- Verify CORS headers
- Use absolute paths for external images
- Add fallback/alt text

### Issue: Button not responding
**Solution**:
- Check onClick handler
- Verify event not prevented
- Check z-index if overlay exists
- Look for pointer-events: none

### Issue: Mobile menu not working
**Solution**:
- Check state management
- Verify onClick handlers
- Check for event bubbling issues
- Test touch events

---

## 🔒 Security Tips

### 1. Sanitize User Input
```jsx
import DOMPurify from 'dompurify';

const sanitizedHTML = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

### 2. Secure API Calls
```jsx
// Use HTTPS
// Send auth tokens in headers
const response = await fetch('/api/data', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### 3. Validate Forms
```jsx
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateForm = (formData) => {
  const errors = {};
  if (!formData.email) errors.email = 'Email required';
  if (!validateEmail(formData.email)) errors.email = 'Invalid email';
  return errors;
};
```

---

## 📈 Performance Tips

### 1. Code Splitting
```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### 2. Image Optimization
```jsx
// Use responsive images
<img 
  src="image-small.jpg"
  srcSet="image-medium.jpg 768w, image-large.jpg 1024w"
  alt="Description"
/>

// Or use picture element
<picture>
  <source media="(max-width: 640px)" srcSet="small.jpg" />
  <source media="(min-width: 641px)" srcSet="large.jpg" />
  <img src="fallback.jpg" alt="Description" />
</picture>
```

### 3. Debouncing & Throttling
```jsx
import { useCallback } from 'react';

// Debounce search input
const [query, setQuery] = useState('');

const handleSearch = useCallback((value) => {
  const timer = setTimeout(() => {
    setQuery(value);
    // API call
  }, 500);
  
  return () => clearTimeout(timer);
}, []);
```

---

## 📞 Quick Reference

### Import Common Libraries
```jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiIcon, FaIcon } from 'react-icons/fi';
```

### Tailwind Classes Quick List
```
Spacing: p, m, gap, w, h, max-w, max-h
Colors: text, bg, border
Sizing: w-1/2, h-64, text-sm, text-lg
Display: flex, grid, hidden, block, inline
Responsive: sm:, md:, lg:, xl:, 2xl:
Hover: hover:bg-primary, hover:text-white
Focus: focus:outline-none, focus:ring-2
Transitions: transition, duration-300, ease-in-out
```

---

**Last Updated**: January 2025
**Version**: 2.0
**Status**: Ready to Use ✅
