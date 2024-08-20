import React from 'react';

const Header = ({ interval, setInterval }) => {

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">Shopify Analytics Dashboard</h1>
                <div className="controls">
                    <label htmlFor="interval">Select Interval: </label>
                    <select
                        id="interval"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        className="font"
                    >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;