import React, { useState } from 'react';
import Slider from "react-slick";
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import github from './src/github.png';
import logos from './src/logosData'
import './Project.css';


const tagsMap = {
    Angular: logos.angular,
    Node: logos.node,
    ASP: logos.asp,
    Vue: logos.vue,
    UE: logos.ue,
    Electron: logos.electron,
    Unity: logos.unity,
    Ktor: logos.ktor,
    Swift: logos.swift
}

const Project = (props) => {
    const [project] = useState({ ...props.data });
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "button__bar",
    };
    return (
        <div className="row project">
            <div className="col-12">
                <Flip top><h3 className="project__title">{project.title}</h3></Flip>
            </div>
            <Fade left>
                <div className="col-12 col-md-6">
                    <Slider {...settings}>
                        {project.images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <img src={image} alt='rtuitlab' width="100%" />
                                </div>
                            )
                        })}
                        {project.videos.map((video, index) => {
                            return (
                                <div key={index} className="embed-responsive embed-responsive-16by9">
                                    <iframe className="embed-responsive-item" src={video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen" title="video"></iframe>
                                </div>
                            )
                        })}
                    </Slider>
                    <button className="project__button_back" onClick={props.onClick}>Вернуться к проектам</button>
                </div>
            </Fade>
            <Fade right>
                <div className="col-12 col-md-6">
                    <div className="project__description"><p>{project.description.replace(/\t/g, "\u00A0\u00A0\u00A0\u00A0")}</p></div>
                    {project.tech.map((tech, index) => {
                        if (tagsMap[tech]) {
                            return (
                                <div key={index} className="project__logos"><img src={tagsMap[tech]} alt='logo'></img></div>
                            )
                        }
                        else {
                            return (<></>)
                        }
                    })}
                    <div className="project__developers"><p><span>Разработчики: </span>{(project.developers.join(' '))}</p></div>
                    {project.site ? <div className="project__site"><p><span>Сайт: </span><a href={'https://' + project.site}>{project.site}</a></p></div> : <div></div>}
                    {project.sourceCode.length > 0 ?
                        <div className="project__source"><span>Исходный код: </span>{
                            project.sourceCode.length > 1 ?
                                project.sourceCode.map((source, index) => {
                                    return (
                                        <div key={index}><a href={source.link}><img src={github} alt="" className="project__source_logo" /><span className="source__name">{source.name}</span></a></div>
                                    )
                                }
                                )
                                : <a href={project.sourceCode[0].link}><img src={github} alt="" className="project__source_logo" /></a>
                        }</div>
                        : <div></div>}
                    <div className="project__date"><p><span>Текущая версия от: </span>{project.date}</p></div>
                </div>
            </Fade>
        </div>
    )
}

export default Project;
