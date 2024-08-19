import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRepeatCustomers } from '../services/apiService';

const RepeatCustomersChart = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRepeatCustomers();

                // Check if response and data are defined and in the expected format
                if (response && response.data && response.data.data) {
                    const repeatCustomersCount = parseInt(response.data.data.repeatCustomers) || 0;
                    setCount(repeatCustomersCount);
                } else {
                    console.error("Unexpected data format:", response ? response.data : undefined);
                    setCount(0); // Default to 0 if data is not as expected
                }
            } catch (error) {
                console.error("Error fetching repeat customers data:", error);
                setCount(0); // Default to 0 on error
            }
        };

        fetchData();
    }, []);

    return (
        <Bar
            data={{
                labels: ['Repeat Customers'],
                datasets: [
                    {
                        label: 'Count',
                        data: [count],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    }
                ]
            }}
            options={{ responsive: true }}
        />
    );
};

export default RepeatCustomersChart;
