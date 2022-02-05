import styles from './Achievements.module.scss'

import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../index.css"
import {Pagination} from "swiper";
import AchievementCard from "../../../components/AchievementCard/AchievementCard";
import {useEffect, useState} from "react";

export default function Achievements() {
  const [count, setCount] = useState(getCount())


  function getCount(){
    const size = window.innerWidth
    if(size<=600) return 1
      else if(size>1030 && size<=1200) return 2
    else return 3
  }


  useEffect(()=>{
    window.addEventListener("resize",()=>{

    })
  },[])

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

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          onSlideChange={(i:any)=>{console.log(i.realIndex)}}
          className={styles.swiper}
        >
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
        </Swiper>
      </div>
    </div>
  )
}
