# 🚀 Quick Start Guide - Authentication & Checkout Testing

## Step 1: Start the Servers

### Start Backend Server (Terminal 1)
```bash
cd "e:\Vs code\Projects\web app\server"
npm start
# Should show: Server running on port 5000
```

### Start Frontend Server (Terminal 2)
```bash
cd "e:\Vs code\Projects\web app\client"
npm start
# Should show: http://localhost:3001
```

## Step 2: Test the Application

### Visit the Application
Open browser: **http://localhost:3001**

---

## 🧪 Testing Workflows

### Test 1: User Registration

1. **Click "Sign Up"** button in top right (or /signup route)
2. **Fill form with:**
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9999999999
   - Password: password123
   - Confirm: password123
3. **Click "Create Account"**
4. ✅ Should redirect to Profile page
5. ✅ Check that user name appears in header

**Expected Result**: User created, JWT token stored in localStorage

---

### Test 2: User Login

1. **Click "Login"** in header (or /login route)
2. **Option A - Use real credentials:**
   - Email: john@example.com
   - Password: password123
3. **Option B - Use demo credentials:**
   - Click "Use Demo Credentials" button
   - Email: demo@example.com
   - Password: demo123
4. **Click "Sign In"**
5. ✅ Should redirect to home page or profile
6. ✅ Check that user name appears in header

**Expected Result**: User logged in, token in localStorage, header updated

---

### Test 3: Profile Management

1. **After login, click user name** in header → "My Account"
2. **View Profile Section:**
   - ✅ User name and avatar visible
   - ✅ Email displayed
   - ✅ Phone number shown
3. **Click "Edit Profile":**
   - Change name to: "John Smith"
   - Change phone to: 8888888888
   - Click "Save"
4. ✅ Profile updated with new data
5. **Click "Logout":**
   - Should redirect to home
   - User name disappears from header
   - Login/Sign Up buttons reappear

**Expected Result**: Profile updates saved in database, logout works

---

### Test 4: Add Delivery Addresses

1. **Click user name → "My Addresses"** (or /address route)
2. **Click "+ Add New Address"** button
3. **Fill address form:**
   ```
   First Name: John
   Last Name: Doe
   Phone: 9999999999
   Address Line 1: 123 Main Street
   Address Line 2: Apt 4B
   City: Mumbai
   State: Maharashtra
   ZIP Code: 400001
   Country: India
   ☑ Set as default
   ```
4. **Click "Save"**
5. ✅ Address appears in list
6. ✅ Green "Default" badge visible
7. **Add another address:**
   - Click "+ Add Another Address"
   - Fill form with different details
   - Don't check default this time
   - Save
8. ✅ Both addresses in list

**Expected Result**: Multiple addresses saved, default marked

---

### Test 5: Add Items to Cart

1. **Go to /products or click "Shop"**
2. **Click on any product**
3. **Adjust quantity to 2**
4. **Click "Add to Cart"**
5. ✅ Cart badge shows "1" (one product type)
6. **Click another product**
7. **Add to cart**
8. ✅ Cart badge shows "2"

**Expected Result**: Items in cart, badge updated

---

### Test 6: Checkout Process

1. **Click cart icon** (or /cart route)
2. **Review cart items and prices**
3. **Click "Proceed to Checkout"**
4. **On Checkout Page (/checkout):**
   - ✅ Shows all cart items
   - ✅ Shows order summary
   - ✅ Address selection available
5. **Select a default address:**
   - Click the address radio button
   - ✅ Border turns primary color
6. **Select Shipping Method:**
   - Standard Shipping (FREE since cart > ₹500)
7. **Review Totals:**
   - ✅ Subtotal calculated
   - ✅ GST (18%) added
   - ✅ Shipping shown (FREE)
   - ✅ Total correct
8. **Click "Proceed to Payment"**

**Expected Result**: Checkout shows all items, address, and correct totals

---

### Test 7: Payment Process

1. **On Payment Page (/payment):**
2. **Select Payment Method:**
   - 💳 Credit/Debit Card (select this)
3. **Fill Card Details:**
   ```
   Card Number: 4111111111111111
   Cardholder Name: John Doe
   Expiry Month: 12
   Expiry Year: 25
   CVV: 123
   ```
4. ✅ Card number auto-formats with spaces
5. **Click "Pay ₹[total]"**
6. **Should redirect to /order-confirmation**

**Expected Result**: Payment processed, order created

---

### Test 8: Order Confirmation

1. **On Order Confirmation Page:**
2. ✅ See success message with checkmark
3. ✅ Order number displayed (last 8 chars of _id)
4. **Order Summary shows:**
   - ✅ All cart items with quantities
   - ✅ Order subtotal
   - ✅ Tax amount
   - ✅ Shipping cost
   - ✅ Order total
5. **Delivery Info shows:**
   - ✅ Selected address
   - ✅ Estimated delivery date
6. **Order Status Timeline:**
   - ✅ Order Placed (completed ✓)
   - ✅ Confirmed (pending)
   - ✅ Shipped (pending)
   - ✅ Delivered (pending)
7. **Payment Status:**
   - ✅ "Payment Successful" (green)
8. **Action Buttons:**
   - ✅ Track Order
   - ✅ Continue Shopping
   - ✅ View All Orders

**Expected Result**: Complete order confirmation with all details

---

### Test 9: View Orders in Profile

1. **Click user name → "My Account"** (or /profile route)
2. **Scroll to "My Orders" section:**
3. ✅ Recently placed order visible
4. ✅ Order shows:
   - Order ID (last 8 chars)
   - Order total (₹)
   - Status badge (Pending/Confirmed/Shipped/Delivered)
   - Date placed
   - Number of items
5. **Order Status Badge colors:**
   - 🟢 Green: Delivered
   - 🔵 Blue: Shipped
   - 🟡 Yellow: Confirmed
   - ⚪ Gray: Pending

**Expected Result**: Orders visible in profile with correct status

---

## 🔍 Verification Checklist

### Authentication ✅
- [ ] Registration form validates inputs
- [ ] Passwords match validation works
- [ ] Email uniqueness enforced
- [ ] Login accepts valid credentials
- [ ] Login rejects invalid credentials
- [ ] JWT token stored in localStorage
- [ ] Logout clears token
- [ ] Protected pages redirect to login if not authenticated

### Addresses ✅
- [ ] Can add multiple addresses
- [ ] Default address marked
- [ ] Address validation works
- [ ] Can delete address
- [ ] Addresses persistent in database

### Checkout ✅
- [ ] Cart items show in checkout
- [ ] Address selection required
- [ ] Shipping method selectable
- [ ] Totals calculated correctly:
  - Tax: 18% of subtotal
  - Shipping: FREE if >₹500, else ₹50
  - Total: Subtotal + Tax + Shipping
- [ ] Data persisted to session

### Payment ✅
- [ ] Card form validates:
  - 16-digit card number
  - 3-digit CVV
  - Non-empty name
  - Valid expiry date
- [ ] Card number formats with spaces
- [ ] Can select multiple payment methods UI
- [ ] Payment successful redirects to confirmation

### Order ✅
- [ ] Order created in database
- [ ] Order has all required fields:
  - Items array
  - User ID
  - Shipping address
  - Payment details
  - Status (pending)
  - Totals (subtotal, tax, shipping, total)
- [ ] Order confirmation shows all details
- [ ] Order appears in user's order list

---

## 🐛 Troubleshooting

### Issue: "Something is already running on port 3000"
**Solution**: App runs on 3001 instead. Use http://localhost:3001

### Issue: Backend connection fails
**Solution**: Make sure MongoDB is running and MONGODB_URI is correct in server

### Issue: "401 Unauthorized" errors
**Solution**: 
- Make sure token is stored in localStorage
- Check that Authorization header is being sent
- Try logging out and logging back in

### Issue: Address not saved
**Solution**:
- Check phone number is 10 digits
- Check all required fields filled
- Check browser console for error messages

### Issue: Payment page shows error
**Solution**:
- Make sure address was selected on checkout
- Check console for error details
- Try using test card: 4111111111111111

---

## 📱 Test Scenarios

### Scenario 1: New User Journey
1. Register → 2. Browse Products → 3. Add to Cart → 4. Checkout → 5. Add Address → 6. Payment → 7. Order Confirmation

### Scenario 2: Returning Customer
1. Login → 2. View Previous Orders → 3. Add More Items → 4. Checkout → 5. Select Saved Address → 6. Payment

### Scenario 3: Error Handling
1. Try invalid email → See error
2. Try password mismatch → See error
3. Try invalid card → See validation error
4. Try checkout without address → See warning
5. Try checkout without login → Redirect to login

---

## 📊 Expected API Calls

### During User Journey:
```
1. POST   /api/auth/register        → Create user account
2. POST   /api/auth/login           → Get JWT token
3. GET    /api/auth/profile         → Load user profile
4. POST   /api/orders/addresses     → Save address
5. GET    /api/orders/addresses     → Load addresses
6. POST   /api/orders/create        → Create order
7. GET    /api/orders/my-orders     → View orders
```

---

## 💡 Tips

- **Keep Developer Console Open**: F12 to see any errors
- **Check Network Tab**: See API calls and responses
- **Check Application Tab**: View localStorage (token and user data)
- **Use Test Card**: 4111111111111111 works in payment form
- **Check Backend Logs**: Terminal shows all API activity

---

## 🎯 Success Indicators

✅ Complete flow works: Register → Browse → Add to Cart → Checkout → Payment → Confirmation

✅ Data persists: Orders visible in profile, addresses saved

✅ Validation works: Invalid inputs rejected with clear messages

✅ Security working: Protected routes redirect to login

✅ No console errors: Browser developer console clean

---

**Version**: 2.0 Authentication & Checkout
**Last Updated**: 2024
**Status**: ✅ Ready for Testing
