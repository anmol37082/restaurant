// backend/routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ POST: Place Order & Send Email
router.post('/', async (req, res) => {
  try {
    const { userId, dishName, quantity, totalPrice, customerName, email, address } = req.body;

    if (!userId || !dishName || !quantity || !totalPrice || !customerName || !email || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const order = new Order({
      userId,
      dishName,
      quantity,
      totalPrice,
      customerName,
      email,
      address,
      status: 'Pending'
    });

    await order.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `Apna Restaurant <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Order Confirmation - Apna Restaurant',
      text: `Hello ${customerName},\n\nYour order has been placed successfully:\n\n- Dish: ${dishName}\n- Quantity: ${quantity}\n- Total Price: ₹${totalPrice}\n\nDelivery Address:\n${address}\n\nYour order will arrive within 30 minutes.\n\nThank you for choosing Apna Restaurant!`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order placed and email sent successfully.' });
  } catch (error) {
    console.error('💥 ORDER ERROR:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// ✅ GET: Fetch all orders (Admin Panel)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ PUT: Update order status to Delivered
router.put('/:id/status', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Delivered' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// ✅ PUT: Cancel order (within 10 mins)
router.put('/:id/cancel', async (req, res) => {
  const { reason } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order already cancelled' });
    }

    const timeDiff = Date.now() - new Date(order.createdAt).getTime();
    const minutesPassed = timeDiff / (1000 * 60);

    if (minutesPassed > 10) {
      return res.status(400).json({
        message: '❌ You can only cancel an order within 10 minutes.'
      });
    }

    order.status = 'Cancelled';
    order.canceledAt = new Date();
    order.cancelReason = reason || 'Order cancelled by customer';

    await order.save();

    res.status(200).json({ message: '✅ Order cancelled successfully', order });

  } catch (error) {
    console.error('Cancel Order Error:', error);
    res.status(500).json({ message: 'Server error while cancelling order' });
  }
});

// ✅ GET: My Orders by userId
router.get('/my-orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('❌ MyOrders Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders for user' });
  }
});

module.exports = router;
