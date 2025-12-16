const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// Address management (place before orderId param routes to avoid conflicts)
router.post('/addresses', orderController.addAddress);
router.get('/addresses', orderController.getAddresses);
router.delete('/addresses/:addressId', orderController.deleteAddress);

// Order management
router.post('/create', orderController.createOrder);
router.get('/my-orders', orderController.getUserOrders);
router.put('/:orderId/payment', orderController.updatePaymentStatus);
router.get('/:orderId', orderController.getOrderDetails);

module.exports = router;
