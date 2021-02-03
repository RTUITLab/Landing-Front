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
                // data = [{"id":0,"title":"VRTherapy - Приложение для релаксации в VR со множеством разнообразных активностей","description":"В VRTherapy вы можете погрузиться в захватывающую и успокаивающую виртуальную реальность с приятным звуковым сопровождением.","images":["https://files.rtuitlab.ru/landing_src/vrtherapy/screenshot1.png","https://files.rtuitlab.ru/landing_src/vrtherapy/screenshot2.png","https://files.rtuitlab.ru/landing_src/vrtherapy/screenshot3.png","https://files.rtuitlab.ru/landing_src/vrtherapy/screenshot4.png"],"videos":[],"date":"02/02/2021","tags":["VR","Game","Simulator","Arcade"],"tech":["Unity","Android","Google VR","Google Cardboard"],"developers":["Баканова М.","Левандровский А.","Матчин А.","Новаков Н."],"site":null,"sourceCode":[{"name":"Проект","link":"https://github.com/RTUITLab/VRTherapy"}]},{"id":1,"title":"StuDo","description":"    Сервис предназначен для людей, кто желает найти себе партнёров или команду для осуществления своей мечты!\n    В чём заключается задача сервиса: это платформа для поиска людей или команды. Как происходит поиск команды: Вы выкладываете объявление, в котором кратко сообщаете о том, что хотите сделать, что собираетесь сделать именно Вы, и какие люди нужны вам в команды. Другие же просматривают ленту объявлений (или ищут по тегам) и видят ваше объявление и сообщают вам, что готовы принять участие в вашем проекте.\n    На данный момент проект находится в разработке, в скором времени будет доступен для публичного тестирования.\n    Данный сервис реализован на мобильных устройствах и разрабатывается под браузер.","images":["https://files.rtuitlab.ru/landing_src/studo/1.png","https://files.rtuitlab.ru/landing_src/studo/2.png","https://files.rtuitlab.ru/landing_src/studo/3.png","https://files.rtuitlab.ru/landing_src/studo/4.png"],"videos":["https://www.youtube.com/embed/WyLDHwuZedc"],"date":"02/02/2021","tags":["Web","Mobile","Tool"],"tech":["Vue","ASP.NET core"],"developers":["Миронов Н. М.","Цуканов Д. М.","Яковлев А. А.","Алексеев Н. Е."],"site":null,"sourceCode":[{"name":"Бэкенд","link":"https://github.com/RTUITLab/StuDo-Back"},{"name":"Фронтэнд","link":"https://github.com/RTUITLab/StuDo-Front"},{"name":"IOS","link":"https://github.com/MrFoggz/StuDo-iOS"},{"name":"Android","link":"https://github.com/Suput/StuDo-Android"}]},{"id":2,"title":"ЗИЛ","description":"    Проект для futurift кресла, который помещает игрока в зону боевых действий, где необходимо оторвать от преследования.","images":["https://github.com/RTUITLab/Project-3IL/raw/master/landing/0.png","https://github.com/RTUITLab/Project-3IL/raw/master/landing/1.png","https://github.com/RTUITLab/Project-3IL/raw/master/landing/2.png","https://github.com/RTUITLab/Project-3IL/raw/master/landing/3.png"],"videos":[],"date":"02/02/2021","tags":["VR"],"tech":["Unity","Steam VR","C#"],"developers":["Смирнов М.А.","Новаков Н.Ю.","Егоркин Н.Е.","Валяев Д.А.","Макаров Д.В.","Макущенко М.А.","Баканова М.В.","Шорин И.А.","Иерусалимов И.Д."],"site":null,"sourceCode":[{"name":"Source code","link":"https://github.com/RTUITLab/Project-3IL"}]},{"id":3,"title":"BunnyHuntVR - Web VR шутер","description":"VR игра, обороняйте грядки от проворных и назойливых зайцев. Узнайте сколько морковки вы сможете сохранить. ","images":["https://files.rtuitlab.ru/landing_src/webvrshoot/BunnyHuntVR.png","https://files.rtuitlab.ru/landing_src/webvrshoot/BunnyHuntVR2.png"],"videos":[],"date":"01/02/2021","tags":["VR","Game","Shooter"],"tech":["A-Frame","Javascript","Html"],"developers":["Соколов А.В","Иерусалимов И.Д."],"site":"https://webvrshoot.rtuitlab.dev/","sourceCode":[{"name":"Проект","link":"https://github.com/RTUITLab/WebVRShoot"}]},{"id":4,"title":"Plain crash simulator","description":"    Симулятор, помещающий пользователя в ситуацию, когда он находится в падающем самолете","images":["https://github.com/RTUITLab/PlainCrashSimulator/raw/master/landing/1.png","https://github.com/RTUITLab/PlainCrashSimulator/raw/master/landing/2.png","https://github.com/RTUITLab/PlainCrashSimulator/raw/master/landing/3.png"],"videos":[],"date":"02/02/2021","tags":["VR"],"tech":["Unity","Steam VR","C#"],"developers":["Валяев Д.А.","Шорин И.А."],"site":null,"sourceCode":[{"name":"Source code","link":"https://github.com/RTUITLab/PlainCrashSimulator"}]},{"id":5,"title":"CyberBird","description":"    Данное приложение является игровым проектом на UnrealEngine. Игра рассчитана на 1-2 игроков, которые управляют птицами как в популярной игре \"Flappy Bird\". Сама игра транслируется на большом экране, а птицы управляются с помощью веб-страницы, открываемой по qr коду в начале игры. Игра стилизована под будущее, а птиц заменили роботы.","images":["https://github.com/RTUITLab/CyberBird/raw/master/Landing/1.png","https://github.com/RTUITLab/CyberBird/raw/master/Landing/2.png","https://github.com/RTUITLab/CyberBird/raw/master/Landing/3.png"],"videos":[],"date":"02/02/2021","tags":["Game","UnrealEngine","Web"],"tech":["UnrealEngine","NodeJS"],"developers":["Акатьев Я.А.","Макущенко М.А.","Коновалова С.В.","Шорин И.А."],"site":null,"sourceCode":[]},{"id":6,"title":"ITLab (система управления лабораторией)","description":"    Для организации работы людей в лаборатории создана система, учитывающая активность людей, участие в мероприятиях, оплату работы сотрудников. Система позволяет распределять нагрузку, обеспечивать прозрачность выполняемых действий и мероприятий. Сайт создан для внутреннего использования и доступ к имеют только сотрудники лаборатории.\n    Проект состоит из нескольких бекендов, написанный на разных языках программирования, таких как C#, GO, Kotlin. Фронтенд реализован на фреймворке Vue.JS. Мобильное приложение для iOS реализовано на языке Swift с использованием фреймворка SwiftUI.\n    Так же система имеет возможность уведомлять людей о изменениях, при помощи бота вконтакте или почты.","images":["https://github.com/RTUITLab/ITLab/raw/master/landing/1.png","https://github.com/RTUITLab/ITLab/raw/master/landing/2.png","https://github.com/RTUITLab/ITLab/raw/master/landing/ios_1.png","https://github.com/RTUITLab/ITLab/raw/master/landing/ios_2.png"],"videos":[],"date":"02/02/2021","tags":["Frontend","Backend","Mobile"],"tech":["Vue","ASP","Ktor","Swift"],"developers":["Макущенко М.А.","Романов Д.Е.","Комар Б.Г.","Кузнецов А.А.","Иванов М.Е."],"site":null,"sourceCode":[{"name":"Фронтенд","link":"https://github.com/RTUITLab/ITLab-Front"},{"name":"Система событий/оборудования","link":"https://github.com/RTUITLab/ITLab-Back"},{"name":"Система уведомлений","link":"https://github.com/RTUITLab/ITLab-Notify"},{"name":"Система записей о работе","link":"https://github.com/RTUITLab/ITLab-Reports"},{"name":"Система учета зарплат","link":"https://github.com/RTUITLab/ITLab-Salary"},{"name":"Приложение для iOS","link":"https://github.com/RTUITLab/ITLab-iOS"}]},{"id":7,"title":"Виртуальный ситуационный центр","description":"    Виртуальный ситуационный центр позволяет множеству людей в любой точке планеты взаимодействовать между собой в единой среде виртуальной реальности. При этом возможно использование любого доступного на данный момент шлема виртуальной реальности. Также сервисом можно пользоваться без шлема, используя клавиатуру и мышь.\n    В сервисе реализована концепция комнат, к которым подключаются люди, и их общение происходит только внутри данного пространства. Разговоры и обмен файлами не выйдут за пределы выделенного пространства, что обеспечивает конфиденциальность приватного общения.\n    Внутри выделенного виртуального пространства люди могут общаться при помощи голосового чата, могут обмениваться документами из облачных хранилищ (OneDrive, Google drive…), просматривать их, комментировать и обсуждать.\n    В данный момент сервис находится на стадии открытого тестирования.","images":["https://files.rtuitlab.ru/landing_src/situation_center/1.png","https://files.rtuitlab.ru/landing_src/situation_center/2.png"],"videos":["https://www.youtube.com/embed/HRFRQa3tMcI"],"date":"02/02/2021","tags":["VR","Social"],"tech":["NodeJS","ASP. net core","Unreal Engine"],"developers":["Макущенко М.А.","Иванов И.Е."],"site":null,"sourceCode":[]},{"id":8,"title":"MicroFileServer (файловый сервер для небольших файлов)","description":"    Данный сервис был разработан для добавления к отчетам сотрудников лаборатории \n    дополнительных файлов (референсных картинок, видеодемонстраций и т.д.)","images":[],"videos":[],"date":"28/01/2021","tags":["Backend"],"tech":["Go","MongoDB"],"developers":["Комар Б.Г."],"site":null,"sourceCode":[]},{"id":9,"title":"Owl Cabin - Летай - созерцай - собирай - улучшай","description":"Приложение представляет собой казуальную мобильную игру. Описание игрового процесса: пользователь заходит в приложение, выбирает локацию, собирает звёздочки и параллельно улучшает свой самолёт, после сбора определенного количества звёзд — игра завершается и можно выбрать локацию снова. Игра сделана простой как в логике, так и в управлении, потому что заточена под вовлечение пользователя не в процесс игры, а расслабление и наслаждение от полёта. На фоне играет успокаивающая музыка, управление только голой.","images":["https://files.rtuitlab.ru/landing_src/owlcabin/1.png","https://files.rtuitlab.ru/landing_src/owlcabin/2.png","https://files.rtuitlab.ru/landing_src/owlcabin/3.png","https://files.rtuitlab.ru/landing_src/owlcabin/4.png","https://files.rtuitlab.ru/landing_src/owlcabin/5.png","https://files.rtuitlab.ru/landing_src/owlcabin/6.png","https://files.rtuitlab.ru/landing_src/owlcabin/7.png"],"videos":[],"date":"02/02/2021","tags":["VR","Game","Aircraft","Relax","Easy play"],"tech":["Unity","Google Cardboard"],"developers":["Миронов Н. М.","Иерусалимов И. Д.","Корчиков М. Д.","Валяев Д. А.","Шошников И. К."],"site":null,"sourceCode":[{"name":"Проект","link":"https://github.com/RTUITLab/OwlCabin"}]},{"id":10,"title":"RTUFileManager","description":"    Система предназначена для структурно-организованного хранения документов. Имеется возможность отслеживания изменений и своевременного оповещения ответственных. При обработке доумента пользователи системы могут общаться и оставлять комментарии.\n    Проект состоит из бэкенда, написанного на C# с использованием фреймфорка ASP .NET CORE. Для реализации фронтенда используется технология Razor Pages фреймворка ASP .NET CORE.","images":["https://files.rtuitlab.ru/landing_src/document_system/1.png","https://files.rtuitlab.ru/landing_src/document_system/2.png","https://files.rtuitlab.ru/landing_src/document_system/3.png","https://files.rtuitlab.ru/landing_src/document_system/4.png"],"videos":[],"date":"02/02/2021","tags":["Web","Tool"],"tech":["Asp.net core","C#","Javascript"],"developers":["Китанин С.C."],"site":null,"sourceCode":[{"name":"Исходный код","link":"https://github.com/RTUITLab/RTUMIREA-FileManager/tree/develop"}]},{"id":11,"title":"GameCenter (система рекордов)","description":"    Система предназначена для формирования очереди на выставочные стенды, для контроля посещаемости проектов лаборатории ИТ и предоставления игровой статистики пользователей.\n    Также предусмотрено администрирование рекордов пользователей, игр, очередей.","images":["https://files.rtuitlab.ru/landing_src/records/1.png","https://files.rtuitlab.ru/landing_src/records/2.png","https://files.rtuitlab.ru/landing_src/records/3.png","https://files.rtuitlab.ru/landing_src/records/4.png"],"videos":[],"date":"02/02/2021","tags":["Web","Tool"],"tech":["Angular","Asp.net core"],"developers":["Китанин С.C.","Южаков В.Е."],"site":null,"sourceCode":[{"name":"Фронтэнд","link":"https://github.com/RTUITLab/GameCenter-Front"},{"name":"Бэкенд","link":"https://github.com/RTUITLab/GameCenter-Backend"}]}]
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
                                                <div style={{aspectRatio: "16 / 9", backgroundColor: "#090a1a"}}></div> :
                                                <img src={project.images[0]} alt={project.title} />
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
