import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BalanceChart from './components/BalanceChart/BalanceChart';
import PnlGraph from './components/PnlGraph/PnlGraph';
import Holdings from './components/Holdings/Holdings';
import PriceChartCard from './components/PriceChartCard/PriceChartCard';
import TrendingTable from './components/TrendingTable/TrendingTable';
import RecentActivity from './components/RecentActivity/RecentActivity';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Layout onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen}>
            <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />

            <main className="dashboard-content">
                <section className="balance-grid">
                    <BalanceChart />
                    <PnlGraph />
                </section>

                <section className="grid first-row">
                    <Holdings />
                    <PriceChartCard />
                </section>

                <section className="grid">
                    <TrendingTable />
                    <RecentActivity />
                </section>
            </main>

            <Footer />
        </Layout>
    );
};

export default App;
