import React, { useState } from 'react';
import SalesOverTimeChart from './components/SalesOverTimeChart';
import SalesGrowthRateChart from './components/SalesGrowthRateChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';


const App = () => {
    const [interval, setInterval] = useState('monthly');

    return (
        <div className="container">
            <h1>Shopify Analytics Dashboard</h1>
            <div className="controls">
                <label htmlFor="interval">Select Interval: </label>
                <select
                    id="interval"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div className="charts">
                <SalesOverTimeChart interval={interval} />
                <SalesGrowthRateChart interval={interval} />
                <NewCustomersChart interval={interval} />
                <RepeatCustomersChart />
                <GeographicalDistributionChart />
                <CustomerLifetimeValueChart />
            </div>
        </div>
    );
};

export default App;
