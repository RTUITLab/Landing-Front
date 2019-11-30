import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeaderTitle from './components/HeaderTitle';
import './Header.css';

const Header = () => {

    // let canvas = React.createRef();
    // let context = canvas[0].getContext("2d");

    useEffect(() => {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        let i = 5;
        let direction = 1;
        let speed = 0.1;
        let dy = i* speed;

        function changeDirection() {
            direction *= -1;
        }

        function draw() {

            dy = i * speed;
            
            context.beginPath();
            if(i > 100 || i<0){
                changeDirection();
            }
            //console.log(i);
            context.clearRect(0, 0, 1600, 900);

            context.moveTo(35, 60 + dy);
            context.lineTo(90, 120 + dy);
            context.lineTo(15, 170 + dy);
            context.closePath();

            context.moveTo(50, 180 - dy);
            context.lineTo(90, 210 - dy);
            context.lineTo(45, 230 - dy);
            context.closePath();

            context.moveTo(40, 250 + dy);
            context.lineTo(250, 350 + dy);
            context.lineTo(100, 420 + dy);
            context.closePath();

            context.moveTo(70, 340 - dy);
            context.lineTo(240, 480 - dy);
            context.lineTo(20, 560 - dy);
            context.closePath();

            context.moveTo(240, 380 - dy);
            context.lineTo(260, 400 - dy);
            context.lineTo(235, 410 - dy);
            context.closePath();

            context.moveTo(140, 460 + dy);
            context.lineTo(260, 420 + dy);
            context.lineTo(220, 580 + dy);
            context.closePath();

            context.moveTo(270, 470 - dy);
            context.lineTo(310, 490 - dy);
            context.lineTo(270, 510 - dy);
            context.closePath();

            context.moveTo(80, 520 + dy);
            context.lineTo(180, 560 + dy);
            context.lineTo(120, 630 + dy);
            context.closePath();

            context.moveTo(20, 580 - dy);
            context.lineTo(350, 750 - dy);
            context.lineTo(-30, 850 - dy);
            context.closePath();

            context.moveTo(150, 620 + dy);
            context.lineTo(350, 670 + dy);
            context.lineTo(100, 750 + dy);
            context.closePath();

            context.moveTo(190, 600 - dy);
            context.lineTo(400, 550 - dy);
            context.lineTo(380, 750 - dy);
            context.closePath();

            context.moveTo(170, 820 + dy);
            context.lineTo(480, 650 + dy);
            context.lineTo(450, 880 + dy);
            context.closePath();

            context.fillStyle = "rgba(255, 0, 36, 0.19)";
            context.strokeStyle = "#ff6363";
            context.fill();
            context.stroke();

            i +=direction;
            requestAnimationFrame(draw);
        }

        requestAnimationFrame(draw);

    },[]);

    

    return (
        <div>
            <div className="header-wrapper">
                <canvas id="canvas" className="header__canvas" width={1600} height={900}></canvas>
                <Navbar/>
                <HeaderTitle/>
            </div>
        </div>
    );
}

export default Header;
