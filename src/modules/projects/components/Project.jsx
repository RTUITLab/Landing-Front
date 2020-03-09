import React, {useState} from 'react';
import Slider from "react-slick";
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import './Project.css';

const Project = (props) => {
    const [project] = useState({...props.data});
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: "button__bar",
      };
    return(
        <div className="row project">
            <div className="col-12">
                <Flip top><h3 className="project__title">{project.title}</h3></Flip>
            </div>
            <Fade left>
                <div className="col-12 col-md-6">
                    <Slider {...settings}>
                        {project.image.map((image, index) => {
                            return(
                                <div key={index}>
                                    <img src={image} alt='rtuitlab' width="100%"/>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </Fade>
            <Fade right>
                <div className="col-12 col-md-6">
                    <div className="project__description"><p>{project.description}</p></div>
                    <div className="project__developers"><p><span>Разработчики: </span>{project.developers}</p></div> 
                    {project.site? <div className="project__site"><p><span>Сайт: </span><a href={'https://' + project.site}>{project.site}</a></p></div> : <div></div> }
                    <div className="project__source"><p><span>Исходный код проекта: </span>{project.source_code}</p></div>
                    <div className="project__date"><p><span>Текущая версия от: </span>{project.date}</p></div>    
                </div>
            </Fade>
        </div>
    )
}

export default Project;
