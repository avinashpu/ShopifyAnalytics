import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getNewCustomersOverTime } from '../services/apiService';

const NewCustomersChart = ({ interval }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNewCustomersOverTime(interval);

                console.log('API Response:', response);

                if (response && response.data && Array.isArray(response?.data)) {
                    const data = response?.data;

                    if (data.length > 0) {
                        const labels = data.map(item => item._id || 'Unknown');
                        const newCustomers = data.map(item => parseInt(item.newCustomers, 10) || 0);

                        setChartData({
                            labels: labels,
                            datasets: [
                                {
                                    label: 'New Customers',
                                    data: newCustomers,
                                    borderColor: 'rgba(255, 159, 64, 1)',
                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
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
                    console.error("Unexpected response structure. Expected data.data to be an array:", response);
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (error) {
                console.error("Error fetching new customers data:", error);
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
                                text: 'New Customers'
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default NewCustomersChart;
