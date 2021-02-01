import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import back from './src/back.png';
import back_down from './src/back_down.png';
import Slider from 'react-slick';
import { Element } from 'react-scroll';
import Project from './components/Project';
import axios from 'axios';

const Projects = () => {
    const slider = useRef();
    const [project, projectView] = useState({
        id: 0,
        title: '',
        images: [],
        tags: [],
        date: '',
        isShown: false,
    });
    const [projects, projectsFetch] = useState([]);
    const [links] = useState([true, false, false, false, false, false]);
    const [currentSlide, changeCurrentSlide] = useState(0);
    const [settings, settingsHandler] = useState({
        dots: true,
        arrows: false,
        infinite: false,
        slidesToShow: 3,
        rows: 2,
        slidesToScroll: 3,
        speed: 500,
        initialSlide: currentSlide,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ],
        dotsClass: "button__bar",
        afterChange: (current) => {changeCurrentSlide(current)},
    });

    useEffect(() => {
        async function fetchData() {
            let data = [];

            try {
                data = (await axios.get(process.env.API || 'api/projects')).data;
            } catch {
                /* data = [
                    {"id":0,"title":"ITLab (система управления лабораторией)","description":"    Для организации работы людей в лаборатории создана система, учитывающая активность людей, участие в мероприятиях, оплату работы сотрудников. Система позволяет распределять нагрузку, обеспечивать прозрачность выполняемых действий и мероприятий. Сайт создан для внутреннего использования и доступ к имеют только сотрудники лаборатории.\n    Проект состоит из нескольких бекендов, написанный на разных языках программирования, таких как C#, GO, Kotlin. Фронтенд реализован на фреймворке Vue.JS.\n    Так же система имеет возможность уведомлять людей о изменениях, при помощи бота вконтакте или почты.","images":["https://files.rtuitlab.ru/landing_src/rtuitlab/1.png","https://files.rtuitlab.ru/landing_src/rtuitlab/2.png"],"videos":[],"date":"28/01/2021","tags":["Frontend","Backend"],"tech":["Vue","ASP","Ktor"],"developers":["Макущенко М.А.","Романов Д.Е.","Комар Б.Г.","Кузнецов А.А."],"site":null,"sourceCode":[{"name":"Фронтенд","link":"https://github.com/RTUITLab/ITLab-Front"},{"name":"Система событий/оборудования","link":"https://github.com/RTUITLab/ITLab-Back"},{"name":"Система уведомлений","link":"https://github.com/RTUITLab/ITLab-Notify"},{"name":"Система записей о работе","link":"https://github.com/RTUITLab/ITLab-Reports"},{"name":"Система учета зарплат","link":"https://github.com/RTUITLab/ITLab-Salary"}]},
                    {"id":1,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"27/01/2021","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]},
                    {"id":5,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"30/01/2021","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]},
                    {"id":4,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"01/01/2021","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]},
                    {"id":3,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"13/12/2020","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]},
                    {"id":2,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"02/02/2021","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]}
                ]; */
                data = JSON.parse(localStorage.getItem('projectsData')) || [];
            } finally {
                data = data.sort((a, b) => {
                    let dateA = new Date(`${a.date.split('/')[2]}.${a.date.split('/')[1]}.${a.date.split('/')[0]}`);
                    let dateB = new Date(`${b.date.split('/')[2]}.${b.date.split('/')[1]}.${b.date.split('/')[0]}`);
                    return (new Date(dateA)) > (new Date(dateB)) ? -1 : 1;
                })
            }

            localStorage.setItem('projectsData', JSON.stringify(data));
            projectsFetch(JSON.parse(localStorage.getItem('projectsData')));
        }
        
        if (localStorage.getItem('projectsData')) {
            projectsFetch(JSON.parse(localStorage.getItem('projectsData')));
        }

        fetchData()
    }, []);

    const selectProjects = (selector, index) => {
        if (selector === 'All') {
            settingsHandler({
                ...settings,
                rows: 2,
            })
            projectsFetch(JSON.parse(localStorage.getItem('projectsData')));
        } else {
            slider.current.slickGoTo(0);
            settingsHandler({
                ...settings,
                rows: 1,
            })
            const selectedProjects = JSON.parse(localStorage.getItem('projectsData')).filter((project) => {
                return project.tags.includes(selector);
            })
            projectsFetch(selectedProjects);
        }
        links.fill(false, 0);
        links[index] = true;
        projectView({
            ...project,
            isShown: false,
        });
        
        
    }

    const setProject = (project) => {
        links.fill(false, 0);
        projectView({
            ...project,
            isShown: true,
        });
        settingsHandler({
            ...settings,
            initialSlide: currentSlide,
        });
    }

    return (
        <Element name="projects">
            <div className="projects-wrapper">
                <img src={back} alt="" width="100%"/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 projects__title">
                            <div className="title-wrapper">
                                <h3 className={links[0] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('All', 0)}>Проекты</h3>
                                <div className="title-wrapper_line"></div>
                            </div>
                        </div>
                        {!project.isShown ?
                            <div className="col-12">
                                <nav className="nav justify-content-around">
                                    <span className={links[1] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('VR', 1)}>VR</span>
                                    <span className={links[2] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Frontend', 2)}>Frontend</span>
                                    <span className={links[3] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Backend', 3)}>Backend</span>
                                    <span className={links[4] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('AR', 4)}>AR</span>
                                    <span className={links[5] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Machine Learning', 5)}>Machine Learning</span>
                                </nav>
                            </div>
                            : <div></div>}
                    </div>
                    {!project.isShown ?
                    <div className="projects__slider">
                        <Slider ref={slider} {...settings}>
                            {projects.map((project, index) => {
                                return (
                                    <div key={index} className="project__item" >
                                        <h1 className="project__item_date">Release date: {project.date}</h1>
                                        <div className="project__item_image">
                                            {!project.images[0] ?
                                                <div style={{aspectRatio: "311 / 175", backgroundColor: "#090a1a"}}></div> :
                                                <img src={project.images[0]} alt={project.title} width="100%"/>
                                            }
                                            
                                            <div className="project__item_title">
                                                <h4 onClick={() => setProject(project)}>{project.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    : <Project data={project} onClick={()=>selectProjects("All", 0)}></Project>}
                </div>
                <img src={back_down} alt="" width="100%"/>
            </div>
        </Element>
    );
}

export default Projects;
