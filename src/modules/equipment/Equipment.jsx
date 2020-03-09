import React from 'react';
import Slider from 'react-slick';
import oculus from './src/oculus.png';
import './Equipment.css';

export default class Equipment extends React.Component {

    state = {
        slideIndex: 0,
        updateCount: 0
      };

    render(){
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 300,
            afterChange: () =>
                this.setState(state => ({ updateCount: state.updateCount + 1 })),
            beforeChange: (current, next) => this.setState({ slideIndex: next })
        };
    
        return (
            <div className="equipment-wrapper">
                Устройства
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                    <div>
                        <img src={oculus} alt="" width="300px" />
                    </div>
                </Slider>
                <input
                    onChange={e => this.slider.slickGoTo(e.target.value)}
                    value={this.state.slideIndex}
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                />
            </div>
        );
    }
}

