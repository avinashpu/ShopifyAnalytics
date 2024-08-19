import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001'; 

export const getTotalSalesOverTime = async (interval) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/total-sales-over-time`, { params: { interval } });
        return response.data;
    } catch (error) {
        console.error("Error fetching total sales over time", error);
        throw error;
    }
};

export const getSalesGrowthRateOverTime = async (interval) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/shopify/totalsales`, { params: { interval } });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales growth rate over time", error);
        throw error;
    }
};

export const getNewCustomersOverTime = async (interval) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/shopify/newcustomers`, { params: { interval } });
        return response.data;
    } catch (error) {
        console.error("Error fetching new customers over time", error);
        throw error;
    }
};

export const getRepeatCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/shopify/repeatcustomers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching repeat customers", error);
        throw error;
    }
};

export const getGeographicalDistribution = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/shopify/geodistribution`);
        return response.data;
    } catch (error) {
        console.error("Error fetching geographical distribution", error);
        throw error;
    }
};

export const getCustomerLifetimeValueByCohorts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/shopify/customerlifetimevalue`);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer lifetime value by cohorts", error);
        throw error;
    }
};
