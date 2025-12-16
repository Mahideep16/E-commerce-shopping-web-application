# ShopHub Design System - Quick Reference

## 🎨 Color Palette

### Primary Colors
- **Primary**: `#EE5A6F` (Myntra Pink)
  - Used for: Buttons, accents, hover states
  - Contrast: WCAG AAA compliant
  - CSS: `text-primary`, `bg-primary`

- **Secondary**: `#FDB913` (Gold)
  - Used for: Badges, highlights, notifications
  - Contrast: Good on dark backgrounds
  - CSS: `text-secondary`, `bg-secondary`

### Neutral Colors
- **Dark**: `#1F2937` (Gray-900)
  - Text color on light backgrounds
  - Card backgrounds on dark themes

- **Light**: `#F3F4F6` (Gray-100)
  - Light backgrounds
  - Input field backgrounds

- **Background**: `#F5F5F5` (Gray-50)
  - Page background
  - Section backgrounds

- **Footer**: `#111827` (Gray-900)
  - Dark backgrounds
  - Contrast with white text

---

## 📐 Responsive Breakpoints

```css
/* Mobile First Approach */
Base Styles (< 640px) - Mobile phones
sm: 640px              - Small tablets
md: 768px              - Tablets
lg: 1024px             - Desktops
xl: 1280px             - Large desktops
2xl: 1536px            - Extra large screens
```

### Usage Examples
```jsx
// Mobile-first, add larger styles with breakpoints
<div className="text-xs md:text-sm lg:text-base">Text</div>
<div className="w-full md:w-1/2 lg:w-1/3">Container</div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">Grid</div>
```

---

## 🔤 Typography

### Font Family
```css
font-family: 'Inter', sans-serif;
```

### Font Sizes (Responsive)
- **Heading 1**: `text-2xl md:text-3xl lg:text-4xl` (32-48px)
- **Heading 2**: `text-xl md:text-2xl` (24-32px)
- **Heading 3**: `text-lg md:text-xl` (18-24px)
- **Body Large**: `text-base md:text-lg` (16-18px)
- **Body**: `text-sm md:text-base` (14-16px)
- **Small**: `text-xs md:text-sm` (12-14px)
- **Extra Small**: `text-xs` (12px)

### Font Weights
```css
font-weight: 300;  /* Light */
font-weight: 400;  /* Regular */
font-weight: 500;  /* Medium */
font-weight: 600;  /* Semibold */
font-weight: 700;  /* Bold */
font-weight: 800;  /* Extra Bold */
font-weight: 900;  /* Black */
```

### Common Text Classes
```jsx
<p className="text-gray-900 font-semibold text-sm">Heading</p>
<p className="text-gray-600 text-sm">Description</p>
<p className="text-gray-400 text-xs">Meta text</p>
```

---

## 📏 Spacing Scale

### Padding & Margin
```
xs: 0.25rem (4px)
sm: 0.5rem  (8px)
md: 1rem    (16px)
lg: 1.5rem  (24px)
xl: 2rem    (32px)
```

### Usage Examples
```jsx
// Padding: p-{size}, px-{size}, py-{size}
<div className="p-4">All sides</div>
<div className="px-4 py-6">Horizontal + Vertical</div>

// Margin: m-{size}, mx-{size}, my-{size}
<div className="mx-auto">Center horizontally</div>
<div className="my-4">Top and bottom margin</div>

// Gap: gap-{size} (flex/grid)
<div className="flex gap-4">Flex with gap</div>
<div className="grid grid-cols-3 gap-4">Grid with gap</div>
```

### Responsive Spacing
```jsx
// Small screens: px-3, Large screens: px-8
<div className="px-3 md:px-8">Content</div>

// Different gaps on different screens
<div className="gap-3 md:gap-4 lg:gap-6">Items</div>
```

---

## 🎯 Component Sizing

### Product Card Height
- Mobile: `h-40` (160px)
- Tablet+: `h-48` (192px)

### Product Grid
- Mobile: `grid-cols-2` (2 columns)
- Tablet: `grid-cols-3` (3 columns)
- Desktop: `grid-cols-4` (4 columns)

### Carousel Card Width
- Mobile: `w-60` (240px)
- Desktop: `md:w-72` (288px)

### Header
- Logo: `text-xl md:text-2xl`
- Icons: `size-20 md:size-24`
- Padding: `px-3 md:px-8 py-3 md:py-4`

---

## 🖱️ Interactive Elements

### Buttons
```jsx
/* Primary Button */
<button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition duration-300">
  Click me
</button>

/* Secondary Button */
<button className="bg-secondary text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300">
  Click me
</button>

/* Ghost Button */
<button className="border-2 border-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:border-primary transition duration-300">
  Click me
</button>
```

### Links
```jsx
<a className="text-primary hover:text-pink-700 transition duration-300 font-semibold">Link</a>
```

### Hover States
```css
hover:bg-primary/90    /* Background with opacity */
hover:text-primary     /* Text color change */
hover:shadow-lg        /* Shadow on hover */
hover:scale-110        /* Scale up slightly */
```

---

## 🎨 Shadows & Elevations

### Card Shadows
```css
shadow-sm     /* Subtle shadow */
shadow-md     /* Medium shadow */
shadow-lg     /* Larger shadow */
shadow-xl     /* Extra large shadow */
shadow-2xl    /* Maximum shadow */
```

### Usage
```jsx
<div className="shadow-md hover:shadow-lg transition-shadow">
  Card content
</div>
```

---

## ✨ Animations & Transitions

### Duration
```css
duration-300   /* 300ms standard */
duration-500   /* 500ms for slower animations */
```

### Transitions
```jsx
<button className="transition duration-300">Button</button>

/* Multiple properties */
<div className="transition-all duration-300">Element</div>

/* Specific properties */
<img className="transition-transform duration-500 hover:scale-110" />
```

### Framer Motion
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## 📱 Responsive Patterns

### Mobile Menu (Hidden on Desktop)
```jsx
<div className="lg:hidden">
  Mobile menu content
</div>

<div className="hidden lg:flex">
  Desktop navigation
</div>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</div>
```

### Responsive Text
```jsx
<h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Heading</h1>
<p className="text-xs md:text-sm lg:text-base">Body text</p>
```

### Responsive Flex Layout
```jsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>
```

---

## ♿ Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid #ee5a6f;
  outline-offset: 2px;
}
```

### Touch Target Sizes
```css
/* Minimum 44px height/width for touch targets */
button, a[role='button'] {
  min-height: 44px;
  min-width: 44px;
}
```

### Color Contrast
- Primary text on white: ✅ WCAG AAA
- Secondary text on gray: ✅ WCAG AA
- White text on primary: ✅ WCAG AAA

---

## 🛠️ Custom CSS Classes

### Utility Classes (from index.css)
```css
.scrollbar-hide          /* Hide scrollbars while keeping scroll */
.container-max           /* Responsive container with max width */
.product-grid            /* Dynamic responsive product grid */
.badge                   /* Base badge styling */
.badge-primary           /* Primary color badge */
.badge-secondary         /* Secondary color badge */
.card                    /* Card component with hover effect */
.line-clamp-1/2/3        /* Limit text to 1, 2, or 3 lines */
.animate-fade-in         /* Fade in animation */
.animate-slide-in        /* Slide in animation */
```

### Usage
```jsx
<div className="scrollbar-hide overflow-x-auto">
  Scrollable content
</div>

<div className="container-max mx-auto">
  Responsive container
</div>

<span className="badge badge-primary">New</span>
<span className="badge badge-secondary">Sale</span>

<div className="card">
  Product card
</div>
```

---

## 🎭 Component Examples

### Product Card
```jsx
<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
  {/* Image Container */}
  <div className="relative h-40 md:h-48 overflow-hidden bg-gray-200">
    <img src="image.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
    <div className="absolute top-2 right-2 badge badge-primary">
      Save 20%
    </div>
  </div>
  
  {/* Content */}
  <div className="p-3 md:p-4">
    <h3 className="font-bold text-sm md:text-base text-gray-900">Product Name</h3>
    <p className="text-xs text-gray-600 mt-1">Category</p>
    <div className="flex items-center gap-2 mt-3">
      <span className="font-bold text-primary">₹999</span>
      <span className="line-through text-gray-400 text-sm">₹1299</span>
    </div>
  </div>
</div>
```

### Button
```jsx
<button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition duration-300">
  Add to Cart
</button>
```

### Card
```jsx
<div className="card p-6">
  <h2 className="text-xl font-bold mb-2">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

---

## 📋 Do's and Don'ts

### ✅ Do's
- Use responsive classes for all screen sizes
- Apply transitions for smooth interactions
- Maintain consistent spacing throughout
- Use semantic HTML elements
- Test on mobile and desktop
- Follow the color palette
- Use focus states for accessibility
- Provide adequate touch targets (44px+)

### ❌ Don'ts
- Don't use fixed widths/heights
- Don't skip responsive breakpoints
- Don't use plain colors outside the palette
- Don't create tiny touch targets
- Don't forget hover/focus states
- Don't mix animation durations
- Don't ignore accessibility guidelines
- Don't overuse animations

---

## 🔗 Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **React Icons**: https://react-icons.github.io/react-icons
- **Google Fonts**: https://fonts.google.com
- **Unsplash Images**: https://unsplash.com
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref

---

**Version**: 2.0
**Last Updated**: January 2025
**Status**: Production Ready ✅
