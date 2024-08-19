import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getNewCustomersOverTime } from '../services/apiService';

const NewCustomersChart = ({ interval }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNewCustomersOverTime(interval);
                const data = response.data.data;

                const labels = data.map(item => item._id);
                const newCustomers = data.map(item => item.newCustomers);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'New Customers',
                            data: newCustomers,
                            borderColor: 'rgba(255, 159, 64, 1)',
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching new customers data:", error);
            }
        };

        fetchData();
    }, [interval]);

    return <Line data={chartData} />;
};

export default NewCustomersChart;
