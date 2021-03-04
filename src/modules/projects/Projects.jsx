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
                data = (await axios.get((process.env.REACT_APP_API || '') + 'api/projects')).data;
            } catch {
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

        if (window.location.pathname !== '/example') {
            if (localStorage.getItem('projectsData')) {
                projectsFetch(JSON.parse(localStorage.getItem('projectsData')));
            }

            fetchData();
        } else {
            window.addEventListener('message', (e) => {
                console.log([e.data]);
                let date = new Date();
                e.data.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                projectsFetch([e.data]);
            });
        }

        let timer = setInterval(() => {
            let elem = document.getElementsByClassName('project__item_image');
            if (elem && elem.item(0)) {
                clearInterval(timer);
                document.documentElement.style.setProperty('--preview-img-height', elem.item(0).clientWidth * 0.5625 + 'px');
            }
        }, 100);

        window.onresize = (e) => {
            timer = setInterval(() => {
                let elem = document.getElementsByClassName('project__item_image');
                if (elem && elem.item(0)) {
                    clearInterval(timer);
                    document.documentElement.style.setProperty('--preview-img-height', elem.item(0).clientWidth * 0.5625 + 'px');
                    
                }
            }, 100);
        }
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
                return project.tags.find((tag) => tag.toLowerCase() === selector.toLowerCase());
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
                                                <div style={{height: "var(--preview-img-height)", backgroundColor: "#090a1a"}}></div> :
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
