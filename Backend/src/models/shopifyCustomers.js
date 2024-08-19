const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  created_at: { type: Date },
  default_address: {
    city: { type: String }
  }
});

module.exports = mongoose.model('Customer', customerSchema, 'shopifyCustomers');
