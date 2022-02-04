import styles from './Achievement.module.scss'

import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../../index.css"
import {Pagination} from "swiper";

export default function Achievements() {

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
          slidesPerView={3}
          spaceBetween={30}
          onSlideChange={(i:any)=>{console.log(i.realIndex)}}
          className={styles.swiper}
        >
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
          <SwiperSlide><div>fds</div></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
