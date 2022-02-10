import styles from './Staff.module.scss'
import {useEffect, useState} from "react";
import UsersCard from "../../../components/UsersCard/UsersCard";
import {SwiperSlide, Swiper} from "swiper/react";
import {Autoplay} from "swiper";

export default function Staff() {
  const [staff, setStaff] = useState([])


  function shuffle(array:[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  useEffect(() => {
    fetch("/staff.json",)
      .then((data) => data.json())
      .then((response) => {
        setStaff(shuffle(response))
      })
  }, [])


  return (
    <div className={styles.parent}>
      <div className={styles.content}>
        <h1>Сотрудники</h1>

        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          className={styles.swiper}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[Autoplay]}
        >
          {staff.map((e:any,i) => {
            return (
              <SwiperSlide key={i}><UsersCard fio={e.fio} tags={e.tags.split(", ")} img={e.img}/></SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}


