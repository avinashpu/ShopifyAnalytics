require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/db');
const shopifyAnalyticsRoutes = require('./src/routes/ShopifyAnalytics.routes');


const corsOptions = {
    origin: '*',  
    Credential: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE","OPTIONS"],
    allowedHeaders: 'Content-Type, Authorization',
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
connectDB();

app.use('/api/shopify', shopifyAnalyticsRoutes);


const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));