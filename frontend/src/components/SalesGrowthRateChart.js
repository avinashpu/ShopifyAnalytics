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

                if (response && response.data) {
                    const data = response.data;

                    if (Array.isArray(data)) {
                        if (data.length > 0) {
                            const labels = data.map(item => item.period || 'Unknown');
                            const growthRates = data.map(item => parseFloat(item.growthRate) || 0);

                            setChartData({
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Sales Growth Rate (%)',
                                        data: growthRates,
                                        borderColor: 'rgba(213, 13, 244, 0.93)',
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
                        } else {
                            setChartData({ labels: [], datasets: [] });
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching sales growth rate data:", error);
                setChartData({ labels: [], datasets: [] });
            }
        };

        fetchData();
    }, [interval]);

    return (
        <div style={{ position: 'relative', height: '400px', width: '1000px' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 20 
                                }
                            }
                        },
                        tooltip: {
                            bodyFont: {
                                size: 18 
                            },
                            titleFont: {
                                size: 20 
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 16 
                                }
                            },
                            title: {
                                display: true,
                                text: 'Time',
                                font: {
                                    size: 20 
                                }
                            }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 16 
                                }
                            },
                            title: {
                                display: true,
                                text: 'Sales Growth Rate (%)',
                                font: {
                                    size: 20 
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default SalesGrowthRateChart;
