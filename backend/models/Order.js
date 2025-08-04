const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dishName: String,
  quantity: Number,
  totalPrice: Number,
  customerName: String,
  email: String,
  address: String,
  cancelReason: String,
  canceledAt: Date,
  status: { 
  type: String, 
  enum: ['Pending', 'Delivered', 'Cancelled'], 
  default: 'Pending' 
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
