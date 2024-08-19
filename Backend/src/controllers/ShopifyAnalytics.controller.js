const ShopifyCustomer = require('../models/shopifyProducts');
const ShopifyOrder = require('../models/shopifyOrders');
const APIResponse = require('../utils/ApiResponse');

const getTotalSalesOverTime = async (req, res) => {
    const { interval } = req.query;

    try {
        const salesData = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: interval, date: "$created_at" } },
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } },
                },
            },
        ]);

        APIResponse.successResponse(res, 'Total sales data fetched successfully', salesData);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

const getSalesGrowthRateOverTime = async (req, res) => {
    const { interval } = req.query;

    try {
        // Aggregate total sales data for each period
        const salesData = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: interval, date: { $ifNull: ["$created_at", new Date()] } } },
                    totalSales: { $sum: { $toDouble: { $ifNull: ["$total_price_set.shop_money.amount", 0] } } },
                },
            },
            {
                $sort: { "_id": 1 }, // Sort by date
            },
        ]);

        // Calculate growth rate
        const growthData = salesData.map((data, index) => {
            if (index === 0) {
                // No growth rate for the first period
                return {
                    period: data._id,
                    growthRate: 0,
                    totalSales: data.totalSales,
                };
            } else {
                const previousSales = salesData[index - 1].totalSales;
                const currentSales = data.totalSales;
                const growthRate = ((currentSales - previousSales) / previousSales) * 100;

                return {
                    period: data._id,
                    growthRate,
                    totalSales: currentSales,
                };
            }
        });

        APIResponse.successResponse(res, 'Sales growth rate data fetched successfully', growthData);
    } catch (error) {
        APIResponse.errorResponse(res, 'Failed to fetch sales growth rate data');
    }
};

const getNewCustomersOverTime = async (req, res) => {
    const { interval } = req.query;

    try {
        const newCustomers = await ShopifyCustomer.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: interval, date: "$created_at" } },
                    count: { $sum: 1 },
                },
            },
        ]);

        APIResponse.successResponse(res, 'New customers data fetched successfully', newCustomers);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

const getRepeatCustomers = async (req, res) => {
    const { interval } = req.query;

    try {
        const repeatCustomers = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: "$customer.email",
                    orderCount: { $sum: 1 },
                },
            },
            {
                $match: {
                    orderCount: { $gt: 1 },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: interval, date: { $ifNull: ["$created_at", new Date()] } } },
                    count: { $sum: 1 },
                },
            },
        ]);

        APIResponse.successResponse(res, 'Repeat customers data fetched successfully', repeatCustomers);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

const getGeographicalDistribution = async (req, res) => {
    try {
        const geoData = await ShopifyCustomer.aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 },
                },
            },
        ]);

        APIResponse.successResponse(res, 'Geographical distribution data fetched successfully', geoData);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

const getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
        const cohorts = await ShopifyOrder.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$created_at" }, year: { $year: "$created_at" }, customer: "$customer.email" },
                    totalSpent: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } },
                },
            },
            {
                $group: {
                    _id: { month: "$_id.month", year: "$_id.year" },
                    avgLifetimeValue: { $avg: "$totalSpent" },
                },
            },
        ]);

        APIResponse.successResponse(res, 'Customer lifetime value by cohorts fetched successfully', cohorts);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = {
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getNewCustomersOverTime,
    getRepeatCustomers,
    getGeographicalDistribution,
    getCustomerLifetimeValueByCohorts,
};
