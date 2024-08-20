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

                if (response && response.data) {
                    const data = response.data;

                    const labels = data.map(item => item._id || 'Unknown');
                    const sales = data.map(item => parseFloat(item.totalSales) || 0);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Sales',
                                data: sales,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 2,
                                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                                pointHoverBorderWidth: 2
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error fetching total sales data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return (
        <div style={{ position: 'relative', height: '400px', width: '1000px',  padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20, 
                                    family: 'Arial', 
                                    weight: 'bold' 
                                }
                            }
                        },
                        tooltip: {
                            bodyFont: {
                                size: 16 
                            },
                            titleFont: {
                                size: 18, 
                                weight: 'bold' 
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 16, 
                                    family: 'Arial' 
                                }
                            },
                            title: {
                                display: true,
                                text: 'Time',
                                font: {
                                    size: 20, 
                                    family: 'Arial', 
                                    weight: 'bold'
                                }
                            }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 16, 
                                    family: 'Arial' 
                                }
                            },
                            title: {
                                display: true,
                                text: 'Total Sales',
                                font: {
                                    size: 20, 
                                    family: 'Arial',
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default SalesOverTimeChart;
