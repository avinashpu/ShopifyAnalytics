const mongoose = require('mongoose');

const shopifyCustomerSchema = new mongoose.Schema({
    _id: { type: String },
    addresses: Array,
    admin_graphql_api_id: String,
    created_at: Date,
    currency: String,
    default_address: Object,
    email: String,
    email_marketing_consent: Object,
    first_name: String,
    last_name: String,
    last_order_id: String,
    last_order_name: String,
    multipass_identifier: String,
    note: String,
    orders_count: Number,
    phone: String,
    sms_marketing_consent: Object,
    state: String,
    tags: String,
    tax_exempt: Boolean,
    tax_exemptions: Array,
    total_spent: String,
    updated_at: Date,
    verified_email: Boolean,
});

module.exports = mongoose.model('ShopifyCustomer', shopifyCustomerSchema);
