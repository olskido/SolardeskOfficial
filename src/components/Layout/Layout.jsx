import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children, onMenuToggle, isMenuOpen }) => {
    return (
        <div className="container">
            <Sidebar isOpen={isMenuOpen} onClose={onMenuToggle} />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
