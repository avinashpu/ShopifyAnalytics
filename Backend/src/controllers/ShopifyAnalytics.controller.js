const ShopifyOrder = require('../models/shopifyOrders');
const ShopifyCustomer = require('../models/shopifyCustomers');
const APIResponse = require('../utils/ApiResponse');

const getTotalSalesOverTime = async (req, res) => {
    try {
        const { interval } = req.query;
        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } },
        }[interval || 'monthly'];

        const salesData = await ShopifyOrder.aggregate([
            { $group: { _id: groupByInterval, totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } } } },
            { $sort: { _id: 1 } }
        ]);

        return APIResponse.successResponse(res, "Total Sales Over Time", salesData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch total sales data");
    }
};

const getSalesGrowthRateOverTime = async (req, res) => {
    try {
        const { interval } = req.query;
        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } },
        }[interval || 'monthly'];

        const salesData = await ShopifyOrder.aggregate([
            { $group: { _id: groupByInterval, totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } } } },
            { $sort: { _id: 1 } }
        ]);

        let growthRateData = [];
        for (let i = 1; i < salesData.length; i++) {
            const growthRate = ((salesData[i].totalSales - salesData[i - 1].totalSales) / salesData[i - 1].totalSales) * 100;
            growthRateData.push({
                period: salesData[i]._id,
                growthRate: growthRate.toFixed(2)
            });
        }

        return APIResponse.successResponse(res, "Sales Growth Rate Over Time", growthRateData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch sales growth data");
    }
};

const getNewCustomersOverTime = async (req, res) => {
    try {
        const { interval } = req.query;
        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } },
        }[interval || 'monthly'];

        const newCustomersData = await ShopifyCustomer.aggregate([
            { $group: { _id: groupByInterval, newCustomers: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        return APIResponse.successResponse(res, "New Customers Over Time", newCustomersData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch new customers data");
    }
};

const getRepeatCustomers = async (req, res) => {
    try {
        const repeatCustomersData = await ShopifyOrder.aggregate([
            { $group: { _id: "$customer.email", orderCount: { $sum: 1 } } },
            { $match: { orderCount: { $gt: 1 } } },
            { $count: "repeatCustomers" }
        ]);

        return APIResponse.successResponse(res, "Repeat Customers Count", repeatCustomersData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch repeat customers data");
    }
};

const getGeographicalDistribution = async (req, res) => {
    try {
        const geoData = await ShopifyCustomer.aggregate([
            { $group: { _id: "$default_address.city", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        return APIResponse.successResponse(res, "Geographical Distribution of Customers", geoData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch geographical distribution data");
    }
};

const getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
        const cohortData = await ShopifyOrder.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, totalValue: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }, customerCount: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        return APIResponse.successResponse(res, "Customer Lifetime Value by Cohorts", cohortData);
    } catch (error) {
        console.error(error);
        return APIResponse.errorResponse(res, "Failed to fetch customer lifetime value data");
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
