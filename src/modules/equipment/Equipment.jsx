import React, {useEffect} from 'react';
import Slider from 'react-slick';
import equipmentData from './src/equipmentData.js'
import './Equipment.css';

export default class Equipment extends React.Component {

    equipment = equipmentData;

    render() {
        const settings = {
            
            dots: false,
            infinite: true,
            slidesToShow: 5,
            speed: 500,
            swipe: false,
            useCSS: false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        swipe: true,
                        useCSS: true,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipe: true,
                        useCSS: true,
                    }
                },
            ]
        };
    
        return (
            <div className="equipment-wrapper">
                <div className="row">
                    <div className="col-12 about__title equipment__title">
                            <h3>Устройства</h3>
                    </div>
                </div>
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                    {this.equipment.map((equipmentItem, index) => {
                        return (
                            <div key={index} className="equipment__item">
                                <div className="equipment__item_title">
                                    <h5 >{equipmentItem.title}</h5>
                                </div>
                                <img src={equipmentItem.image} alt="" width="100%"/>
                            </div>
                        )
                    })}
                </Slider>
                <input
                    className="slider__control"
                    onChange={e => this.slider.slickGoTo(e.target.value / 100)}
                    defaultValue={0}
                    type="range"
                    min={0}
                    max={800}
                    step={1}
                />
            </div>
        );
    }
}

