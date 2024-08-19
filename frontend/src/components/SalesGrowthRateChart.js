import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSalesGrowthRateOverTime } from '../services/apiService';

const SalesGrowthRateChart = ({ interval }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSalesGrowthRateOverTime(interval);
                const data = response.data.data;

                const labels = data.map(item => item.period);
                const growthRates = data.map(item => parseFloat(item.growthRate));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sales Growth Rate (%)',
                            data: growthRates,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching sales growth rate data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return <Line data={chartData} />;
};

export default SalesGrowthRateChart;
