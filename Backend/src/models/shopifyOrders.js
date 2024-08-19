const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  created_at: { type: Date },
  total_price_set: {
    shop_money: {
      amount: { type: Number }
    }
  },
  customer: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    created_at: { type: Date }
  }
});

module.exports = mongoose.model('Order', orderSchema, 'shopifyOrders');
