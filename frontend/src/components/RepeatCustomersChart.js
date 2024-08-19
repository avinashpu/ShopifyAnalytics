import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRepeatCustomers } from '../services/apiService';

const RepeatCustomersChart = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRepeatCustomers();
                setCount(response.data.data.repeatCustomers);
            } catch (error) {
                console.error("Error fetching repeat customers data:", error);
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
