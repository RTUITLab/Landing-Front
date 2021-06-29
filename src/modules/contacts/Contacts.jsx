import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Element } from 'react-scroll';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import './Contacts.css';

const Contacts = () => {

    const initialForm = {
        name: '',
        email: '',
        info: '',
        check: false
    }

    const [form, handleChange] = useState(initialForm)

    const onChange = event => {
        handleChange(
            {
                ...form,
                [event.target.name]: event.target.value
            }
        )
    }

    const createNotification = (type) => {
            switch (type) {
                case 'success':
                    NotificationManager.success('Ваша заявка принята', 'Спасибо!');
                    break;
                case 'error':
                    NotificationManager.error('Попробуйте позже', 'Что-то пошло не так!');
                    break;
                default:
                    break;
            }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://dev.manage.rtuitlab.dev/api/feedback/ContractUs/',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ name: form.name, email: form.email, message: form.info })
            }
        )
            .then((a) => {
                createNotification('success');
                handleChange(initialForm);
            })
            .catch((err) => {
                createNotification('error');
                console.error(err);
            })
    }

    return (
        <Element name="contact">
            <NotificationContainer />
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
                                    maxLength="50"
                                    className="contacts__item" />
                                <br />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="E-Mail"
                                    value={form.email}
                                    onChange={onChange}
                                    required
                                    maxLength="50"
                                    className="contacts__item" />
                                <br />
                                <textarea
                                    name="info"
                                    type="text"
                                    placeholder="Расскажите о себе"
                                    value={form.info}
                                    onChange={onChange}
                                    required
                                    maxLength="2000"
                                    autoComplete="off"
                                    className="contacts__item contacts__textarea" />
                                <br />
                                <input 
                                    type="checkbox" 
                                    name="accept" 
                                    id="accept"
                                    className="checkbox"
                                    value={form.check}
                                    onChange={onChange}
                                    required/>
                                    <label htmlFor="accept" className="accept__label">Даю согласие на обработку и хранение моих персональных данных</label>
                                <input type="submit" value="Отправить" className="contacts__item" />
                            </form>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className="col-12 col-md-6 col-xl-7 contacts__map">
                            <div className="yandex__map">
                                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aff28e2e5f7e5d4aa35169da49e89f02812a23b87bef9fff8b4050cbd11cc8985&amp;source=constructor" width="100%" height="300" frameBorder="0" title="map"></iframe>
                                <p className="contacts__address">Москва, Проспект Врнадского 78,<br />
                                    РТУ МИРЭА <br />
                                    Институт Информационных Технолгий<br />
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
        </Element>
    );
}

export default Contacts;
