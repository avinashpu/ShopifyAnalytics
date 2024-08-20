import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRepeatCustomers } from '../services/apiService';

const RepeatCustomersChart = ({ interval }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRepeatCustomers(interval);

                console.log("Response:", response);

                if (response && response.data) {
                    const data = Array.isArray(response.data) ? response.data : [response.data];

                    console.log("Data:", data);

                    const labels = data.map(item => item._id || 'Unknown');
                    const newCustomers = data.map(item => parseInt(item.repeatCustomers, 10) || 0);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Repeat Customers',
                                data: newCustomers,
                                borderColor: 'rgba(255, 159, 64, 1)',
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderWidth: 2,
                                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
                                pointHoverBorderColor: 'rgba(255, 159, 64, 1)',
                                pointHoverBorderWidth: 2
                            }
                        ]
                    });
                } else {
                    console.error("Response or response.data is undefined:", response);
                }
            } catch (error) {
                console.error("Error fetching repeat customers data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return (
        <div style={{ position: 'relative', height: '400px', width: '1000px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                                text: 'Repeat Customers',
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

export default RepeatCustomersChart;
