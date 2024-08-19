const express = require('express');
const router = express.Router();
const {
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getNewCustomersOverTime,
    getRepeatCustomers,
    getGeographicalDistribution,
    getCustomerLifetimeValueByCohorts,
} = require('../controllers/ShopifyAnalytics.controller');

router.get('/totalsales', getTotalSalesOverTime);
router.get('/salesgrowth', getSalesGrowthRateOverTime);
router.get('/newcustomers', getNewCustomersOverTime);
router.get('/repeatcustomers', getRepeatCustomers);
router.get('/geodistribution', getGeographicalDistribution);
router.get('/customerlifetimevalue', getCustomerLifetimeValueByCohorts);

module.exports = router;
