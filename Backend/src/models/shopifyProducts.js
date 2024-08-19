const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String }
});

module.exports = mongoose.model('Product', productSchema, 'shopifyProducts');
