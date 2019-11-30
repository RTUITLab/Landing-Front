import React from 'react';
import './News.css';
import Slider from "react-slick";
import news from './src/news.jpg'

const News = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="news-wrapper">
            <div className="news__background"></div>
            <div className="row">
                <div className="col-6">
                    <Slider {...settings}>
                        <div>
                            <img src={news} alt="" width="100%"/>
                        </div>
                        <div>
                            <img src={news} alt="" width="100%"/>
                        </div>
                        <div>
                            <img src={news} alt="" width="100%"/>
                        </div>
                    </Slider>
                </div>
                <div className="col-6">
                    hello
                </div>
            </div>
        </div>
    );
}

export default News
