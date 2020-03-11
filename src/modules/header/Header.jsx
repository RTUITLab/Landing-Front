import React from 'react';
import Navbar from './components/Navbar';
import HeaderTitle from './components/HeaderTitle';
import Triangles from './components/Triangles';
import './Header.css';

const Header = () => {

    return (
        <div>
            <div className="header-wrapper">
                <Triangles/>
                <Navbar/>
                <HeaderTitle/>
            </div>
        </div>
    );
}

export default Header;
