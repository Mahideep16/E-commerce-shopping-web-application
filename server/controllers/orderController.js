const Order = require('../models/Order');
const User = require('../models/User');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping above 500
    const total = subtotal + tax + shipping;

    // Normalize items to match schema (string productId)
    const normalizedItems = items.map((item) => ({
      productId: String(item.productId || item.id || item._id || ''),
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
      image: item.image,
      name: item.name,
    }));

    const order = new Order({
      userId,
      items: normalizedItems,
      shippingAddress: {
        name: shippingAddress.name || `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim(),
        phone: shippingAddress.phone,
        addressLine1: shippingAddress.addressLine1 || shippingAddress.street,
        addressLine2: shippingAddress.addressLine2 || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
      paymentMethod,
      paymentDetails: {
        amount: total,
        status: paymentMethod === 'cod' ? 'pending' : 'completed',
      },
      subtotal,
      tax,
      shipping,
      total,
      orderStatus: paymentMethod === 'cod' ? 'pending' : 'confirmed',
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order._id,
        items: order.items,
        shippingAddress: order.shippingAddress,
        total: order.total,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        paymentMethod: order.paymentMethod,
        paymentDetails: order.paymentDetails,
        status: order.orderStatus,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      orders: orders.map(order => ({
        id: order._id,
        items: order.items,
        total: order.total,
        status: order.orderStatus,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('userId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      order: {
        id: order._id,
        items: order.items,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        paymentDetails: order.paymentDetails,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
        status: order.orderStatus,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// Update order payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, transactionId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        'paymentDetails.status': status,
        'paymentDetails.transactionId': transactionId,
        'paymentDetails.paymentDate': new Date(),
        orderStatus: status === 'completed' ? 'confirmed' : 'pending',
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Payment status updated',
      order: {
        id: order._id,
        paymentDetails: order.paymentDetails,
        status: order.orderStatus,
      },
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({ message: 'Error updating payment' });
  }
};

// Add address
exports.addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addressData = req.body;

    console.log('Adding address for user:', userId);
    console.log('Address data received:', addressData);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: addressData,
        },
      },
      { new: true }
    );

    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Address added successfully. Total addresses:', user.addresses.length);

    res.status(200).json({
      message: 'Address added successfully',
      addresses: user.addresses,
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ message: 'Error adding address', error: error.message });
  }
};

// Get user addresses
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      addresses: user.addresses,
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ message: 'Error fetching addresses' });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    console.log('Deleting address:', addressId, 'for user:', userId);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          addresses: { _id: addressId },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Address deleted successfully. Remaining addresses:', user.addresses.length);

    res.status(200).json({
      message: 'Address deleted successfully',
      addresses: user.addresses,
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ message: 'Error deleting address', error: error.message });
  }
};
