const mongoose = require('mongoose');

const shopifyProductSchema = new mongoose.Schema({
    _id: { type: String },
    admin_graphql_api_id: String,
    body_html: String,
    created_at: Date,
    handle: String,
    id: String,
    image: String,
    images: Array,
    options: Array,
    product_type: String,
    published_at: Date,
    published_scope: String,
    status: String,
    tags: String,
    template_suffix: String,
    title: String,
    updated_at: Date,
    variants: Array,
    vendor: String,
});

module.exports = mongoose.model('ShopifyProduct', shopifyProductSchema);
