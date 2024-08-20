import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCustomerLifetimeValueByCohorts } from '../services/apiService';

const CustomerLifetimeValueChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Customer Lifetime Value',
                data: [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
            {
                label: 'Customer Lifetime Value (Line)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
                type: 'line'
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCustomerLifetimeValueByCohorts();
                const data = response?.data;

                if (Array.isArray(data)) {
                    const labels = data.map(item => item._id);
                    const values = data.map(item => parseFloat(item.totalValue) || 0); 

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Customer Lifetime Value',
                                data: values,
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgba(255, 159, 64, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Customer Lifetime Value (Line)',
                                data: values,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderWidth: 2,
                                fill: false,
                                type: 'line'
                            }
                        ]
                    });
                } else {
                    console.error("Expected an array but got:", data);
                }
            } catch (error) {
                console.error("Error fetching customer lifetime value data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ position: 'relative', height: '400px', width: '1000px'  }}>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 16, 
                                weight:'bold',}
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `Value: ${context.raw}`,
                            },
                            bodyFont: {
                                size: 16 
                            },
                            titleFont: {
                                size: 18 
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Cohort',
                                font: {
                                    size: 18 
                                }
                            },
                            ticks: {
                                font: {
                                    size: 16 
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Lifetime Value',
                                font: {
                                    size: 18 
                                }
                            },
                            ticks: {
                                font: {
                                    size: 16 
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default CustomerLifetimeValueChart;
