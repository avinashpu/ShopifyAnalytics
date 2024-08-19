import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getTotalSalesOverTime } from '../services/apiService';

const SalesOverTimeChart = ({ interval }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalSalesOverTime(interval);
                const data = response.data.data;

                const labels = data.map(item => item._id);
                const sales = data.map(item => parseFloat(item.totalSales));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Sales',
                            data: sales,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching total sales data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return <Line data={chartData} />;
};

export default SalesOverTimeChart;
