import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSalesGrowthRateOverTime } from '../services/apiService';

const SalesGrowthRateChart = ({ interval }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSalesGrowthRateOverTime(interval);

                // Check if the response structure is valid
                if (response && response.data && Array.isArray(response.data.data)) {
                    const data = response.data.data;

                    if (data.length > 0) {
                        const labels = data.map(item => item.period || 'Unknown');
                        const growthRates = data.map(item => parseFloat(item.growthRate) || 0); // Handle NaN

                        setChartData({
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Sales Growth Rate (%)',
                                    data: growthRates,
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
                    console.error("Unexpected response structure or undefined data:", response);
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (error) {
                console.error("Error fetching sales growth rate data:", error);
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

export default SalesGrowthRateChart;
