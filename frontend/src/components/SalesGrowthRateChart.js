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

                console.log('API Response:', response);

                if (response && response.data) {
                    const data = response?.data;

                    if (Array.isArray(data)) {
                        if (data.length > 0) {
                            const labels = data.map(item => item.period || 'Unknown');
                            const growthRates = data.map(item => {
                                const rate = parseFloat(item.growthRate);
                                if (isNaN(rate)) {
                                    console.error(`Invalid growthRate value: ${item.growthRate}`);
                                    return 0;
                                }
                                return rate;
                            });

                            setChartData({
                                labels: labels,
                                datasets: [
                                    {
                                        label: 'Sales Growth Rate (%)',
                                        data: growthRates,
                                        borderColor: 'rgba(153, 102, 255, 1)',
                                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
                        console.error("response.data.data is not an array or is undefined:", response.data.data);
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
                console.error("Error fetching sales growth rate data:", error);
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
                                text: 'Sales Growth Rate (%)'
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default SalesGrowthRateChart;
