import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import './Contacts.css';

const Contacts = () => {

    const [form, handleChange] = useState({
        name: '',
        theme: '',
        info: '',
    })

    const onChange = event => {
        handleChange(
            {
                ...form,
                [event.target.name]: event.target.value
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    }

    return (
        <div>
        <div className="contacts-wrapper">
                <div className="row">
                    <div className="col-12 about__title contacts__title">
                            <h3>Связаться с нами</h3>
                    </div>
                    <Fade left>
                        <div className="col-12 col-md-6 col-xl-5">
                            <form onSubmit={handleSubmit} className="contacts__form">
                                <input 
                                    name="name" 
                                    type="text" 
                                    placeholder="ФИО" 
                                    value={form.name} 
                                    onChange={onChange} 
                                    required 
                                    className="contacts__item"/>
                                <br/>
                                <input 
                                    name="theme" 
                                    type="text" 
                                    placeholder="Тема" 
                                    value={form.theme} 
                                    onChange={onChange} 
                                    required 
                                    autoComplete="off" 
                                    className="contacts__item"/>
                                <br/>
                                <textarea 
                                    name="info" 
                                    type="text" 
                                    placeholder="Расскажите о себе" 
                                    value={form.info} 
                                    onChange={onChange} 
                                    required 
                                    autoComplete="off" 
                                    className="contacts__item contacts__textarea"/>
                                <br/>
                                <input type="submit" value="Отправить" className="contacts__item"/>
                            </form>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="col-12 col-md-6 col-xl-7 contacts__map">
                            <div className="yandex__map">
                                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aff28e2e5f7e5d4aa35169da49e89f02812a23b87bef9fff8b4050cbd11cc8985&amp;source=constructor" width="100%" height="300" frameBorder="0" title="map"></iframe>
                                <p className="contacts__address">Москва, Проспект Врнадского 78,<br/>
                                    РТУ МИРЭА <br/>
                                    Институт Информационных Технолгий<br/>
                                    ауд. А - 439
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>
        </div>
        <div className="slogan-wrapper">
            <div className="slogan">
                <h3>Нормально делай, нормально будет!</h3>
            </div>
        </div>
        </div>
    );
}

export default Contacts;
