import React from 'react';
import Navbar from './components/Navbar';
import HeaderTitle from './components/HeaderTitle';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className="header-wrapper">
                <Navbar/>
                <HeaderTitle/>
            </div>
        </div>
    );
}

export default Header;
