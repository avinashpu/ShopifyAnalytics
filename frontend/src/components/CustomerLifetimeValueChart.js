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
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCustomerLifetimeValueByCohorts();
                const data = response?.data;

                console.log("Full response:", response);
                console.log("Data:", data);

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

    return <Bar data={chartData} options={{ responsive: true }} />;
};

export default CustomerLifetimeValueChart;
