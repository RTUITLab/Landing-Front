import { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import UsersCard from "../../../components/UsersCard/UsersCard";
import styles from "./Staff.module.scss";

export default function Staff() {
  const [staff, setStaff] = useState([]);

  function shuffle(array: []) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    fetch("/staff.json")
      .then((data) => data.json())
      .then((response) => {
        setStaff(shuffle(response));
      });
  }, []);

  return (
    <article className={styles.parent} id={"staff"}>
      <section className={styles.content}>
        <h1>Сотрудники</h1>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          className={styles.swiper}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div style={{ width: "5vw" }}></div>
          </SwiperSlide>
          {staff.map((e: any, i) => {
            return (
              <SwiperSlide key={i}>
                <UsersCard fio={e.name} tags={e.tags.split(", ")} img={e.img} />
              </SwiperSlide>
            );
          })}
          <SwiperSlide>
            <div className={styles.lastSlideElement}></div>
          </SwiperSlide>
        </Swiper>
      </section>
    </article>
  );
}
