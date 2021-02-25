import React from 'react';
import Slider from 'react-slick';
import equipmentData from './src/equipmentData.js'
import './Equipment.css';

export default class Equipment extends React.Component {

    equipment = equipmentData;
    currentWidth = window.innerWidth;

    settings = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 4,
        speed: 500,
        swipe: false,
        useCSS: false,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    swipe: true,
                    useCSS: true,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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

    breakpoints = this.settings.responsive.filter((i) => { 
        return this.currentWidth < i.breakpoint;
    })

    componentDidMount() {
        this.slider.slickGoTo(10 / 100);
    }

    render() {
        return (
            <div className="equipment-wrapper" id="equipment">
                <div className="row">
                    <div className="col-12 about__title equipment__title">
                            <h3>Устройства</h3>
                    </div>
                </div>
                <Slider ref={slider => (this.slider = slider)} {...this.settings}>
                    {this.equipment.map((equipmentItem, index) => {
                        return (
                            <div key={index}>
                                <div className="equipment__item">
                                    <div className="equipment__item_title">
                                        <h5 >{equipmentItem.title}</h5>
                                    </div>
                                    <img src={equipmentItem.image} alt="" width="100%"/>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
                <input
                    className="slider__control"
                    onChange={e => this.slider.slickGoTo(e.target.value / 100)}
                    defaultValue={10}
                    type="range"
                    min={10}
                    max={this.currentWidth > 1600 ? ((this.equipment.length - this.settings.slidesToShow) * 100 - 10) : ((this.equipment.length - this.breakpoints[this.breakpoints.length - 1].settings.slidesToShow) * 100 - 10)}
                    step={1}
                />
            </div>
        );
    }
}

