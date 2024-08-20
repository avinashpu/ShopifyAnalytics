import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SalesOverTimeChart from './components/SalesOverTimeChart';
import SalesGrowthRateChart from './components/SalesGrowthRateChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';

const App = () => {
    const [interval, setInterval] = useState('monthly');

    return (
        <div className="app-container">
            <Header interval={interval} setInterval={setInterval} />
            <main className="main-content">
                <div className="charts">
                    <SalesOverTimeChart interval={interval} />
                    <SalesGrowthRateChart interval={interval} />
                    <NewCustomersChart interval={interval} />
                    <RepeatCustomersChart interval={interval} />
                    <GeographicalDistributionChart />
                    <CustomerLifetimeValueChart />
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default App;
