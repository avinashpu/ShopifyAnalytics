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

                console.log('API Response:', response);

                if (response && response.data) {
                    console.log('Response Data:', response.data);

                    const data = response?.data;
                    
                    if (Array.isArray(data)) {
                     
                        if (data.length > 0) {
                            const labels = data.map(item => item._id || 'Unknown');
                            const sales = data.map(item => {
                                const sale = parseFloat(item.totalSales);
                                if (isNaN(sale)) {
                                    console.error(`Invalid totalSales value: ${item.totalSales}`);
                                    return 0;
                                }
                                return sale;
                            });

                            setChartData({
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Total Sales',
                                        data: sales,
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderWidth: 2,
                                    }
                                ]
                            });
                        } else {
                            console.warn("Data array is empty:", data);
                            setChartData({
                                labels: [],
                                datasets: []
                            });
                        }
                    } else {
                        console.error("response.data.data is not an array or is undefined:", data);
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

    return (
        <div style={{ position: 'relative', height: '400px', width: '600px' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Sales'
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default SalesOverTimeChart;
