import React from 'react';
import './Footer.css';
import title from './src/title.png'
import logo from './src/logo.svg'
import github from './src/github.png'
import vk from './src/vk.png'
import youtube from './src/youtube.png'
import { Link } from "react-scroll";

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer__logo">
                <img src={logo} alt="" height="54px"/>
                <img src={title} alt="" className="footer__title"/>
            </div>
            <div className="footer__navigation">
                <div className="row">
                    <div className="col-3">
                        <ul className="footer__navigation__item">
                            <li><Link to="about" spy={true} smooth={true} duration={1000}>О нас</Link></li>
                            <li>Новости</li>
                            <li>Устройства</li>
                            <li><Link to="projects" spy={true} smooth={true} duration={1000}>Проекты</Link></li>
                            <li>Сотрудники</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className="footer__navigation__item">
                            <li><span className="contacts">Контакты</span></li>
                            <a href="https://github.com/RTUITLab"><img src={github} alt="github_logo" className="github footer_logo"/></a>
                            <a href="https://vk.com/rtuitlab"><img src={vk} alt="vk_logo" className="vk footer_logo"/></a>
                            <a href="https://www.youtube.com/channel/UC3nHF99l4aYHUvOqXkrKsaQ"><img src={youtube} alt="youtube_logo" className="youtube footer_logo"/></a>
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul className="footer__navigation__item footer__right">
                            <li>Войти в систему</li>
                            <br/>
                            <li><span className="contacts">РТУ МИРЭА</span></li>
                            <li><span className="contacts">Институт Информационных Технологий</span></li>
                        </ul>
                    </div>
                    <div className="col-12 copyright-wrapper">
                        <div className="copyright__circle"></div>
                        <h6 className="copyright">Москва</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
