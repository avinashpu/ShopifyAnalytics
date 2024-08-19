const ShopifyOrder = require('../models/shopifyOrders');
const ShopifyCustomer = require('../models/shopifyCustomers');
const ShopifyProduct = require('../models/shopifyProducts');
const APIResponse = require('../utils/ApiResponse');


const getTotalSalesOverTime = async (req, res) => {
    try {
        console.log("getTotalSalesOverTime - Request Query:", req.query);

        const { interval } = req.query;
        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } },
        }[interval || 'monthly'];

        if (!groupByInterval) {
            return APIResponse.errorResponse(res, "Invalid interval parameter");
        }

        console.log("getTotalSalesOverTime - Group By Interval:", groupByInterval);

        const salesData = await ShopifyOrder.aggregate([
            // Convert the created_at field to a Date object
            {
                $addFields: {
                    created_at: {
                        $toDate: "$created_at"
                    }
                }
            },
            { $group: { _id: groupByInterval, totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } } } },
            { $sort: { _id: 1 } }
        ]);

        console.log("getTotalSalesOverTime - Sales Data:", salesData);

        return APIResponse.successResponse(res, "Total Sales Over Time", salesData);
    } catch (error) {
        console.error("getTotalSalesOverTime - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch total sales data");
    }
}; //complated



const getSalesGrowthRateOverTime = async (req, res) => {
    try {
        console.log("getSalesGrowthRateOverTime - Request Query:", req.query);

        const { interval } = req.query;
        const trimmedInterval = (interval || '').trim(); 

        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } },
        }[trimmedInterval || 'monthly'];

        if (!groupByInterval) {
            return APIResponse.errorResponse(res, "Invalid interval parameter");
        }

        console.log("getSalesGrowthRateOverTime - Group By Interval:", groupByInterval);

        const salesData = await ShopifyOrder.aggregate([
            {
                $addFields: {
                    created_at: { $toDate: "$created_at" }
                }
            },
            {
                $group: {
                    _id: groupByInterval,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        console.log("getSalesGrowthRateOverTime - Aggregation Pipeline Results:", salesData);

        if (salesData.length === 0) {
            return APIResponse.successResponse(res, "No data available for the selected interval", []);
        }

        if (salesData.length < 2) {
            return APIResponse.successResponse(res, "Not enough data to calculate growth rate", []);
        }

        let growthRateData = [];
        for (let i = 1; i < salesData.length; i++) {
            const prev = salesData[i - 1].totalSales;
            const current = salesData[i].totalSales;

            if (prev === 0) {
                growthRateData.push({
                    period: salesData[i]._id,
                    growthRate: "Infinity"
                });
            } else {
                const growthRate = ((current - prev) / prev) * 100;
                growthRateData.push({
                    period: salesData[i]._id,
                    growthRate: growthRate.toFixed(2)
                });
            }
        }

        console.log("getSalesGrowthRateOverTime - Growth Rate Data:", growthRateData);

        return APIResponse.successResponse(res, "Sales Growth Rate Over Time", growthRateData);
    } catch (error) {
        console.error("getSalesGrowthRateOverTime - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch sales growth data");
    }
}; //complated


const getNewCustomersOverTime = async (req, res) => {
    try {
        console.log("getNewCustomersOverTime - Request Query:", req.query);

        const { interval } = req.query;
        const groupByInterval = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            monthly: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
            quarterly: { $dateToString: { format: "%Y-Q", date: "$created_at" } },
            yearly: { $dateToString: { format: "%Y", date: "$created_at" } }
        }[interval || 'monthly'];

        if (!groupByInterval) {
            return APIResponse.errorResponse(res, "Invalid interval parameter");
        }

        console.log("getNewCustomersOverTime - Group By Interval:", groupByInterval);

        const newCustomersData = await ShopifyCustomer.aggregate([
            {
                $addFields: {
                    created_at: { $toDate: "$created_at" }
                }
            },
            {
                $group: {
                    _id: groupByInterval,
                    newCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        console.log("getNewCustomersOverTime - New Customers Data:", newCustomersData);

        return APIResponse.successResponse(res, "New Customers Over Time", newCustomersData);
    } catch (error) {
        console.error("getNewCustomersOverTime - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch new customers data");
    }
};//complated


const getRepeatCustomers = async (req, res) => {
    try {
        console.log("getRepeatCustomers - Starting...");

        const repeatCustomersData = await ShopifyOrder.aggregate([
            { 
                $group: {
                    _id: "$customer.id",    
                    orderCount: { $sum: 1 }
                }
            },
            { 
                $match: { orderCount: { $gt: 1 } } 
            },
            { 
                $count: "repeatCustomers" 
            }
        ]);

        console.log("getRepeatCustomers - Repeat Customers Data:", repeatCustomersData);

        if (repeatCustomersData.length === 0) {
            return APIResponse.successResponse(res, "No repeat customers found", { repeatCustomers: 0 });
        }

        const count = repeatCustomersData[0].repeatCustomers;

        return APIResponse.successResponse(res, "Repeat Customers Count", { repeatCustomers: count });
    } catch (error) {
        console.error("getRepeatCustomers - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch repeat customers data");
    }
}; //complated


const getGeographicalDistribution = async (req, res) => {
    try {
        console.log("getGeographicalDistribution - Starting...");

        const geoData = await ShopifyCustomer.aggregate([
            { $group: { _id: "$default_address.city", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        console.log("getGeographicalDistribution - Geographical Data:", geoData);

        return APIResponse.successResponse(res, "Geographical Distribution of Customers", geoData);
    } catch (error) {
        console.error("getGeographicalDistribution - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch geographical distribution data");
    }
}; //complated

const getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
        console.log("getCustomerLifetimeValueByCohorts - Starting...");

        const cohortData = await ShopifyOrder.aggregate([
            // Convert 'created_at' to a Date object
            {
                $addFields: {
                    created_at: { $toDate: "$created_at" }
                }
            },
            // Group by customer ID to get the first purchase month and total value
            {
                $group: {
                    _id: "$customer.id",
                    firstPurchaseMonth: { $first: { $dateToString: { format: "%Y-%m", date: "$created_at" } } },
                    totalValue: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            // Group by the first purchase month to aggregate total value and count customers
            {
                $group: {
                    _id: "$firstPurchaseMonth",
                    totalValue: { $sum: "$totalValue" },
                    customerCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by the cohort month
        ]);

        console.log("getCustomerLifetimeValueByCohorts - Cohort Data:", cohortData);

        return APIResponse.successResponse(res, "Customer Lifetime Value by Cohorts", cohortData);
    } catch (error) {
        console.error("getCustomerLifetimeValueByCohorts - Error:", error);
        return APIResponse.errorResponse(res, "Failed to fetch customer lifetime value data");
    }
};
 //complated


module.exports = {
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getNewCustomersOverTime,
    getRepeatCustomers,
    getGeographicalDistribution,
    getCustomerLifetimeValueByCohorts,
};
