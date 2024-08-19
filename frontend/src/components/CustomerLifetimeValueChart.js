import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCustomerLifetimeValueByCohorts } from '../services/apiService';

const CustomerLifetimeValueChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCustomerLifetimeValueByCohorts();
                const data = response.data.data;

                const labels = data.map(item => item._id);
                const values = data.map(item => parseFloat(item.totalValue));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Customer Lifetime Value',
                            data: values,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching customer lifetime value data:", error);
            }
        };

        fetchData();
    }, []);

    return <Bar data={chartData} />;
};

export default CustomerLifetimeValueChart;
