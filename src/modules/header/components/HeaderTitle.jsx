import React from 'react';
import './HeaderTitle.css';
import logo from '../src/logo.svg'
import title from '../src/title.png'

const HeaderTitle = () => {
    return (
        <div className="header-title-wrapper">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <br />
            <div className="title">
                <img src={title} alt="title" />
            </div>
        </div>

    );
}

export default HeaderTitle;
