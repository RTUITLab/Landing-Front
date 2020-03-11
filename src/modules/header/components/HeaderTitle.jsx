import React from 'react';
import Fade from 'react-reveal/Fade';
import './HeaderTitle.css';
import logo from '../src/logo.svg'
import title from '../src/title.png'

const HeaderTitle = () => {
    return (
        <div className="header-title-wrapper">
            <Fade left>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </Fade>
            <br />
            <Fade right>
                <div className="header__title">
                    <img src={title} alt="title" />
                </div>
            </Fade>
        </div>
    );
}

export default HeaderTitle;
