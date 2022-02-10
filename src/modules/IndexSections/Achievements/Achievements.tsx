import styles from './Achievements.module.scss'
import statusBarStyles from '../../../components/StatusBar/StatusBar.module.scss'

import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../index.css"
import {Controller, Pagination} from "swiper";
import AchievementCard from "../../../components/AchievementCard/AchievementCard";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

export default function Achievements() {

  const pagination = {
    clickable: true,
    renderBullet: function (index:any, className:any) {
      return '<span class="'+className+'"></span>';
    },
  };

  return (
    <div className={styles.achievementsParent}>
      <div className={styles.content}>
        <h1>Достижения</h1>
        <div className={styles.text}>Сегодня RTUITLab – это более 30 IT-специалистов, среди которых backend,
          frontend-разработчики, ML, VR/AR, DevOps – специалисты, дизайнеры и системные архитекторы, на счету которых
          множество реализованных проектов. Материальная база Института Информационных Технологий позволяет сотрудникам
          работать с порой эксклюзивным оборудованием, собирать под него проекты, демонстрировать их на выставках и
          конференциях.
        </div>

        <div id={"swiperParent"}>
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            slidesPerView={"auto"}
            spaceBetween={15}

            className={styles.swiper}
          >
            <SwiperSlide><div style={{width:"10vw"}}></div></SwiperSlide>
            <SwiperSlide>
              <AchievementCard title={"Тест какой то длинной надписи супер пупер надписи"} desc={"Тесfffffffт какойfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff то fffffffffffffffffffffдлинной надписи супер пупер надписи"} cover={"/images/background.webp"} link={"f"}/>
            </SwiperSlide>
            <SwiperSlide>
              <AchievementCard title={"Тест какой то длинной надписи супер пупер надписи"} desc={"f"} cover={"/images/background.webp"} link={"f"}/>
            </SwiperSlide>
            <SwiperSlide>
              <AchievementCard title={"Тест какой то длинной надписи супер пупер надписи"} desc={"Тесfffffffт какойfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff то fffffffffffffffffffffдлинной надписи супер пупер надписи"} cover={"/images/background.webp"} link={"f"}/>
            </SwiperSlide>
            <SwiperSlide>
              <AchievementCard title={"Тест какой то длинной надписи супер пупер надписи"} desc={"Тесfffffffт какойfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff то fffffffffffffffffffffдлинной надписи супер пупер надписи"} cover={"/images/background.webp"} link={"f"}/>
            </SwiperSlide>
            <SwiperSlide>
              <AchievementCard title={"Тест какой то длинной надписи супер пупер надписи"} desc={"Тесfffffffт какойffff ffffffffffffff fffffffffffffffffffffffffffffffffffffffffffffffffffffffff то fffffffffffffffffffffдлинной надписи супер пупер надписи"} cover={"/images/background.webp"} link={"f"}/>
            </SwiperSlide>
            <SwiperSlide><div style={{width:"10vw"}}></div></SwiperSlide>

          </Swiper>
        </div>

      </div>
    </div>
  )
}
