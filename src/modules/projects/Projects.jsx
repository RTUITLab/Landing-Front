import React, { useState, useEffect } from 'react';
import './Projects.css'
import projectsData from './src/projectsData'
import Slider from 'react-slick';
import { Element } from 'react-scroll';
import Project from './components/Project';

const Projects = () => {
    const [project, projectView] = useState({
        id: 0,
        title: '',
        image: [],
        tags: [],
        date: '',
        isShown: false,
    });
    const [projects, projectsFetch] = useState([]);
    const [links] = useState([true, false, false, false, false, false, false]);
    const [settings, settingsHandler] = useState({
        //className: "center",
        dots: true,
        arrows: false,
        infinite: false,
        //centerPadding: "60px",
        slidesToShow: 3,
        rows: 2,
        slidesToScroll: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                }
            },
        ],
        dotsClass: "button__bar",
    });

    useEffect(() => {
        projectsFetch(projectsData);
    }, [])

    const selectProjects = (selector, index) => {
        if (selector === 'All') {
            projectsFetch(projectsData);
            settingsHandler({
                ...settings,
                rows: 2,
            })
        } else {
            const selectedProjects = projectsData.filter((project) => {
                return project.tags.includes(selector);
            })
            projectsFetch(selectedProjects);
            settingsHandler({
                ...settings,
                rows: 1,
            })
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
    }

    return (
        <Element name="projects">
            <div className="projects-wrapper">
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
                                    <span className={links[1] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('VR', 1)}>VR/AR</span>
                                    <span className={links[2] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Frontend', 2)}>Frontend</span>
                                    <span className={links[3] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Backend', 3)}>Backend</span>
                                    <span className={links[4] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('AR', 4)}>AR</span>
                                    <span className={links[5] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Unity', 5)}>Unity</span>
                                    <span className={links[6] ? "nav-link active" : "nav-link"} onClick={() => selectProjects('Machine Learning', 6)}>Machine Learning</span>
                                </nav>
                            </div>
                            : <div></div>}
                    </div>
                    {!project.isShown ?
                    <div className="projects__slider">
                        <Slider {...settings}>
                            {projects.map((project, index) => {
                                return (
                                    <div key={index} className="project__item" >
                                        <h1 className="project__item_date">Release date: {project.date}</h1>
                                        <div className="project__item_image">
                                            <img src={project.image[0]} alt={project.title} width="100%"/>
                                            <div className="project__item_title">
                                                <h4 onClick={() => setProject(project)}>{project.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    : <Project data={project}></Project>}
                </div>
            </div>
        </Element>
    );
}

export default Projects;
