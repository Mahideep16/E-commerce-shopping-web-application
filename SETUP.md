# 🚀 Installation & Setup Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: v4.0 or higher (local or Atlas)
- **Git**: For version control (optional)

## Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd "e:\Vs code\Projects\web app"
```

### Step 2: Install All Dependencies

This installs packages for both client and server:

```bash
npm run setup
```

Or manually:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Go back to root
cd ..
```

### Step 3: Configure Backend Environment

Create/Edit `server/.env` file:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this to something secure!)
JWT_SECRET=your_super_secret_jwt_key_12345
```

### Step 4: Set Up MongoDB

#### Option A: Local MongoDB

1. **Download MongoDB**: https://www.mongodb.com/try/download/community
2. **Install MongoDB**
3. **Start MongoDB Service**:

   Windows:
   ```bash
   mongod
   ```

   macOS:
   ```bash
   brew services start mongodb-community
   ```

   Linux:
   ```bash
   sudo systemctl start mongod
   ```

4. **Verify Connection**:
   ```bash
   mongosh
   # or
   mongo
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**
3. **Create Database User**
4. **Get Connection String**
5. **Update `.env`**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

### Step 5: Start Development Environment

From project root:

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Or manually:

```bash
# Terminal 1 - Frontend
cd client
npm start

# Terminal 2 - Backend
cd server
npm run dev
```

### Step 6: Verify Everything Works

1. **Frontend**: Open http://localhost:3000
   - Should see ShopHub home page
   - Test navigation
   - Test add to cart

2. **Backend**: Check http://localhost:5000/api/products
   - Should return empty array (or mock data)

3. **Console**: No errors should appear

---

## 🎯 First Time Setup Checklist

```
□ Node.js installed (node --version)
□ npm installed (npm --version)
□ MongoDB installed or Atlas account created
□ Project dependencies installed
□ .env file configured
□ MongoDB running (local or Atlas connected)
□ Frontend starts without errors
□ Backend starts without errors
□ Can see products page without errors
□ Can add items to cart
□ Cart persists in localStorage
```

---

## 🔧 Useful Commands

### Development

```bash
# Start both frontend and backend
npm run dev

# Start only frontend
cd client && npm start

# Start only backend
cd server && npm run dev

# Run backend in production mode
cd server && npm start
```

### Building

```bash
# Build frontend for production
npm run build

# Output will be in client/build/
```

### Database

```bash
# Open MongoDB shell
mongosh
# or
mongo

# Create sample database
use ecommerce

# Insert sample data
db.products.insertMany([...])

# View all products
db.products.find()
```

### Troubleshooting

```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run setup

# Clear npm cache
npm cache clean --force

# Check for port conflicts
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# macOS/Linux:
lsof -i :3000
lsof -i :5000
```

---

## ⚠️ Common Issues & Solutions

### Issue: "MongoDB connection failed"

**Solution 1: MongoDB not running**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Solution 2: Wrong connection string**
- Check `MONGODB_URI` in `.env`
- Verify database name matches
- For Atlas: Check IP whitelist

**Solution 3: Wrong credentials**
- Verify username/password in connection string
- Reset credentials in MongoDB Atlas if needed

---

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Change frontend port
PORT=3001 npm start

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

---

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Update server/.env
PORT=5001

# Or kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

---

### Issue: "CORS errors in browser console"

**Solution:**
- Ensure backend is running on correct port
- Check CORS configuration in `server/server.js`
- Verify API endpoints in frontend components

---

### Issue: "Module not found" errors

**Solution:**
```bash
# Reinstall dependencies
npm run setup

# Or manually:
cd client && npm install
cd ../server && npm install
```

---

### Issue: "npm is not recognized"

**Solution:**
- Install Node.js from https://nodejs.org
- Restart terminal/command prompt
- Verify: `node --version` and `npm --version`

---

### Issue: "Cannot find module 'react'"

**Solution:**
```bash
# Reinstall React dependencies
cd client
npm install react react-dom react-router-dom

# Clear cache
npm cache clean --force
```

---

### Issue: Frontend shows blank page

**Solution:**
1. Check browser console for errors (F12)
2. Check if backend is running
3. Try hard refresh (Ctrl+Shift+R)
4. Clear browser cache
5. Check network tab for failed requests

---

## 📝 Environment Variables Explanation

### `MONGODB_URI`
- **Purpose**: MongoDB connection string
- **Format**: `mongodb://localhost:27017/dbname`
- **Atlas**: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

### `PORT`
- **Purpose**: Backend server port
- **Default**: 5000
- **Change if**: Port already in use

### `JWT_SECRET`
- **Purpose**: Secret key for JWT tokens
- **Security**: Change this in production!
- **Length**: Minimum 32 characters recommended

### `NODE_ENV`
- **Purpose**: Environment mode
- **Values**: `development`, `production`
- **Impact**: Logging, caching, error messages

---

## 🚀 Next Steps After Setup

1. **Explore the UI**
   - Click around the site
   - Test navigation
   - Add items to cart

2. **Check the Code**
   - Read component code
   - Understand folder structure
   - Review API routes

3. **Customize**
   - Change colors in `tailwind.config.js`
   - Add your products
   - Modify content

4. **Connect Frontend to Backend**
   - Replace mock data with API calls
   - Use axios for HTTP requests
   - Handle loading/error states

5. **Add Features**
   - User authentication
   - Payment gateway
   - Product details page
   - Wishlist functionality

---

## 📚 Documentation Files

- **README.md** - Complete project overview
- **QUICKSTART.md** - Quick start guide
- **PROJECT_SUMMARY.md** - What's included
- **FEATURES.md** - Feature overview
- **client/README.md** - Frontend documentation
- **server/README.md** - Backend documentation

---

## 🆘 Need Help?

1. **Check Documentation**
   - Read relevant README files
   - Check FEATURES.md for UI details

2. **Common Issues**
   - Review "Common Issues" section above
   - Check browser console (F12)
   - Check terminal output

3. **Debug**
   - Use React DevTools browser extension
   - Check Network tab in DevTools
   - Look at server console logs

4. **Online Resources**
   - [React Documentation](https://react.dev)
   - [Express.js Guide](https://expressjs.com)
   - [MongoDB Manual](https://docs.mongodb.com)
   - [Stack Overflow](https://stackoverflow.com)

---

## ✅ Verification Checklist

After setup, verify:

```bash
# 1. Frontend loads
http://localhost:3000
# Should see: ShopHub home page with products

# 2. Backend API works
http://localhost:5000/api/products
# Should return: JSON array (empty or with data)

# 3. Cart works
# Open DevTools → Application → localStorage
# Add item to cart → Check cartItems in localStorage

# 4. Navigation works
# Click all header links
# All pages should load without errors

# 5. Responsive design works
# Open DevTools → Toggle Device Toolbar
# Test on different screen sizes
```

---

## 🎉 You're All Set!

Your ShopHub e-commerce platform is now ready to use. Start exploring, customizing, and building amazing features!

**Happy coding!** 🚀

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm run setup` |
| Start dev | `npm run dev` |
| Start frontend | `cd client && npm start` |
| Start backend | `cd server && npm run dev` |
| Build frontend | `npm run build` |
| View API | `http://localhost:5000/api/products` |
| View App | `http://localhost:3000` |

---

**Last updated**: December 2024
**Project**: ShopHub E-Commerce Platform
**Status**: Ready for Development ✅
