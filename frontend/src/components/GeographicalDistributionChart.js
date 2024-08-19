import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getGeographicalDistribution } from '../services/apiService';

const GeographicalDistributionChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGeographicalDistribution();

                if (response && response.data && Array.isArray(response?.data)) {
                    const data = response?.data;

                    const labels = data.map(item => item._id);
                    const counts = data.map(item => item.count);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                data: counts,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            }
                        ]
                    });
                } else {
                    console.error("Expected an array but got:", response ? response.data : undefined);
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (error) {
                console.error("Error fetching geographical distribution data:", error);
                setChartData({
                    labels: [],
                    datasets: []
                });
            }
        };

        fetchData();
    }, []);

    return <Pie data={chartData} options={{ responsive: true }} />;
};

export default GeographicalDistributionChart;
