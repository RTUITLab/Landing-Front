import React from 'react';
import './About.css'
import Fade from 'react-reveal/Fade';
import { Element } from 'react-scroll';

const About = () => {

    // function randomVideo() {
    //     return (Math.floor(Math.random() * 2) === 0);
    // }

    return (
        <Element name="about">
        <div className="about-wrapper">
            <div className="row">
                <div className="col-12 about__title">
                        <h3>О нас</h3>
                </div>
                <Fade bottom>
                    <div className="col-12 col-lg-12 about__text">

                        <p>Лаборатория RTUITLab появилась в 2016 году в стенах Института Информационных Технологий РТУ МИРЭА. Тогда это была группа энтузиастов, которые пробовали свои силы в освоении новых технологий, ездили на первые выставки и хакатоны. </p>
                        <p>Сегодня RTUITLab&nbsp;–&nbsp;это более 30 IT-специалистов, среди которых backend, frontend-разработчики, ML, VR/AR, DevOps&nbsp;–&nbsp;специалисты, дизайнеры и системные архитекторы, на счету которых множество реализованных проектов. Материальная база Института Информационных Технологий позволяет сотрудникам работать с порой эксклюзивным оборудованием, собирать под него проекты, демонстрировать их на выставках и конференциях.</p>
                        <p>Чем мы занимаемся? Мы создаем программные продукты, которые используются в различных сферах деятельности и выводят образовательный процесс на новый уровень. Команды Reality из RTUITLab&nbsp;–&nbsp;многократные победители хакатонов и конференций. Многие сотрудники являются преподавателями образовательных программ, которые Институт ИТ проводит в сотрудничестве с компаниями Яндекс, Samsung и другими, а также преподают на внутренних кафедрах Института.</p>

                    </div>
                </Fade>
                {/* <div className="col-12 col-lg-10 col-xl-6 about__video">
                    <div className="embed-responsive embed-responsive-16by9">
                        {
                            randomVideo() 
                            ? <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/o3jGgXlmcLc" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="about"></iframe>
                            : <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/TfeiDECd3RQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="about"></iframe>
                        }
                    </div>
                </div> */}
            </div>
        </div>
        </Element>
    );
}

export default About;
