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

                // Check if the response and data are in the expected format
                if (response && response.data && Array.isArray(response.data.data)) {
                    const data = response.data.data;

                    if (data.length > 0) {
                        const labels = data.map(item => item._id || 'Unknown');
                        const newCustomers = data.map(item => parseInt(item.newCustomers) || 0);

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
                        console.error("Data array is empty:", data);
                    }
                } else {
                    console.error("Expected an array but got:", response ? response.data : undefined);
                }
            } catch (error) {
                console.error("Error fetching new customers data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default NewCustomersChart;
