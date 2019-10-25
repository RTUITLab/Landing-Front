import React, { useState, useEffect } from 'react';
import './Projects.css'
import projectsData from './src/projectsData'
import Slider from 'react-slick';
import { Element } from 'react-scroll';

const Projects = () => {

    const [projects, projectsFetch] = useState([]);

    useEffect(() => {
        projectsFetch(projectsData);
    }, [])

    const settings = {
        className: "center",
        dots: true,
        arrows: false,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        rows: 2,
        slidesToScroll: 3,
        speed: 500,
        dotsClass: "button__bar",
        // customPaging: i => (
        //     <div
        //       className="slider__dots"
        //       style={{
        //         marginTop: "25px",
        //         width: "12px",
        //         height: "12px",
        //         border: "2px solid #e2001c",
        //         borderRadius: '50%',
        //       }}
        //     >
                
        //     </div>
        //   )
    };

    return (
        <Element name="projects">
            <div className="projects-wrapper">
                <div className="container">
                    <Slider {...settings}>
                        {projects.map((project, index) => {
                            return (
                                <div key={index}>
                                    <h1 className="project__text">{project.title}</h1>
                                    <img src={project.image} alt="" className="project__image" />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </Element>
    );
}

export default Projects;
