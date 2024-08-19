import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getTotalSalesOverTime } from '../services/apiService';

const SalesOverTimeChart = ({ interval }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalSalesOverTime(interval);

                // Check if response structure is valid
                if (response && response.data && Array.isArray(response.data.data)) {
                    const data = response.data.data;

                    if (data.length > 0) {
                        const labels = data.map(item => item._id || 'Unknown');
                        const sales = data.map(item => parseFloat(item.totalSales) || 0); // Handle NaN

                        setChartData({
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Total Sales',
                                    data: sales,
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderWidth: 2, // Added borderWidth for better visibility
                                }
                            ]
                        });
                    } else {
                        console.error("Data array is empty:", data);
                        setChartData({
                            labels: [],
                            datasets: []
                        });
                    }
                } else {
                    console.error("Unexpected response structure:", response);
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (error) {
                console.error("Error fetching total sales data:", error);
                setChartData({
                    labels: [],
                    datasets: []
                });
            }
        };

        fetchData();
    }, [interval]);

    return <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default SalesOverTimeChart;
