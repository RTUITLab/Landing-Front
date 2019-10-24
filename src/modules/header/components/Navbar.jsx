import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {

    const [state, stateHandler] = useState({
        isActive: false,
    });

    const scrollHadler = () => {
        stateHandler({ isActive: false });
    }

    return (
        <nav className="navbar-wrapper d-flex justify-content-between">

            <div className="burger-menu d-lg-none" onClick={() => stateHandler({ isActive: !state.isActive })}>
                <span
                    className={state.isActive ? "burger-menu__btn burger-menu__btn_active" : "burger-menu__btn"}>
                    <span></span>
                </span>
            </div>

                <ul className={state.isActive ? "nav nav_active d-lg-flex" : "nav d-lg-flex"}>
                    <li className="nav-item">
                        <Link to="about" spy={true} smooth={true} duration={1000} className="nav-link active" onClick={scrollHadler}>О нас</Link>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Новости</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Проекты</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link active">Устройства</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Сотрудники</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Контакты</span>
                    </li>
                </ul>

            <div className="login">
                <span className="nav-link">Вход</span>
            </div>

        </nav>
    );
}

export default Navbar;
