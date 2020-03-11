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

                <ul className={state.isActive ? "nav navigation nav_active d-lg-flex" : "nav navigation d-lg-flex"}>
                    <li className="nav-item">
                        <Link to="about" spy={true} smooth={true} duration={1000} className="nav-link" onClick={scrollHadler}>О нас</Link>
                    </li>
                    {/* <li className="nav-item">
                        <span className="nav-link">Новости</span>
                    </li> */}
                    <li className="nav-item">
                        <Link to="projects" spy={true} smooth={true} duration={1000} offset={75} className="nav-link" onClick={scrollHadler}>Проекты</Link>
                    </li>
                    {/* <li className="nav-item">
                        <span className="nav-link">Устройства</span>
                    </li> */}
                    {/* <li className="nav-item">
                        <span className="nav-link">Сотрудники</span>
                    </li> */}
                    <li className="nav-item">
                        <Link to="contact" spy={true} smooth={true} duration={1000} className="nav-link" onClick={scrollHadler}>Контакты</Link>
                    </li>
                </ul>

            {/* <div className="login">
                <span className="nav-link"><a href="https://identity.rtuitlab.ru/" target="_blank" rel="noopener noreferrer">Вход</a></span>
            </div> */}

        </nav>
    );
}

export default Navbar;
