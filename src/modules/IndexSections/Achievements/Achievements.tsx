import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import AchievementCard from "../../../components/AchievementCard/AchievementCard";
import "../../../index.css";
import styles from "./Achievements.module.scss";

export default function Achievements() {
  const pagination = {
    clickable: true,
    renderBullet: function (_index: any, className: any) {
      return '<span class="' + className + '"></span>';
    },
  };

  let data = [
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
    {
      title: "Тест какой-то длинной надписи",
      desc: "Odio rerum aut officia eos. Sit beatae recusandae minima natus consequatur.",
      cover: "http://placeimg.com/640/480/abstract",
      link: "/test/test/test",
    },
  ];

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
            {data.map((e) => {
              return (
                <SwiperSlide>
                  <AchievementCard
                    title={e.title}
                    desc={e.desc}
                    cover={e.cover}
                    link={e.link}
                  />
                </SwiperSlide>
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
