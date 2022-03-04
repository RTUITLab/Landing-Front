import React, { useState } from "react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import AchievementCard from "../../../components/AchievementCard/AchievementCard";
import "../../../index.css";
import styles from "./Achievements.module.scss";
import { AchievementsData } from "./achievementsData";
import dataList from "../../../data/achievements";

export default function Achievements() {
  let initData: AchievementsData[] = JSON.parse(dataList);
  const [data, setData] = useState(initData);

  const pagination = {
    clickable: true,
    renderBullet: function (_index: any, className: any) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <article className={styles.achievementsParent} id={"achievemtns"}>
      <section className={styles.content}>
        <h1>Достижения</h1>
        <article className={styles.text}>
          Сегодня RTUITLab – это более 30 IT-специалистов, среди которых
          backend, frontend-разработчики, ML, VR/AR, DevOps – специалисты,
          дизайнеры и системные архитекторы, на счету которых множество
          реализованных проектов. Материальная база Института Информационных
          Технологий позволяет сотрудникам работать с порой эксклюзивным
          оборудованием, собирать под него проекты, демонстрировать их на
          выставках и конференциях.
        </article>

        <section id={"swiperParent"}>
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            slidesPerView={"auto"}
            spaceBetween={15}
            className={styles.swiper}
          >
            <SwiperSlide>
              <div style={{ width: "5vw" }}></div>
            </SwiperSlide>
            {data.map((e: AchievementsData, i: number) => {
              return (
                <React.Fragment key={i}>
                  <SwiperSlide key={i + "SwiperSlide"}>
                    <AchievementCard
                      title={e.name}
                      desc={e.desc}
                      cover={e.cover}
                      link={e.link}
                    />
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
            <SwiperSlide>
              <div style={{ width: "5vw" }}></div>
            </SwiperSlide>
          </Swiper>
        </section>
      </section>
    </article>
  );
}
