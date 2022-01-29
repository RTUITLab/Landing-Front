import Gallery, {GalleryItem} from "../../components/Gallery/Gallery";
import React, {useState} from "react";
import styles from './Index.module.scss'
import { Swiper, SwiperSlide } from "swiper/react";

export default function Index(props:any){
  const [state, setState]=useState(2)
  const [viewInfo,setViewInfo]=useState(true)

  return(
    <div>

      <Gallery active={2} onChange={(e)=>setState(e)} onMouseDown={()=>setViewInfo(false)} onMouseUp={()=>setViewInfo(true)}>
        <GalleryItem>
          <img draggable={false} src="https://y3p9n5g8.rocketcdn.me/wp-content/uploads/2015/10/G-Shock-Black-White-2015-Series-3.jpg" alt=""/>
        </GalleryItem>
        <GalleryItem>
          <img draggable={false} src="https://iron-bet.ru/upload/iblock/059/059082d919f971dd434f9f16d14d02d8.jpg" alt=""/>
          {state==1 && viewInfo?(
            <div>1</div>
          ):null}
        </GalleryItem>
        <GalleryItem >
          <img draggable={false} src="https://avatars.mds.yandex.net/get-zen_doc/4340095/pub_60aca78ee427ca189c05e538_60aca97b5b173649aa53f11e/scale_1200" alt=""/>
          {state==2 && viewInfo?(
            <div>2</div>
          ):null}
        </GalleryItem>
        <GalleryItem>
          <img draggable={false} src="https://avatars.mds.yandex.net/get-zen_doc/1721884/pub_5e3ba7ff6a2d430435041575_5e3bab8bc9621d0cc22c21a1/scale_1200" alt=""/>
        </GalleryItem>
        <GalleryItem>
          <img draggable={false} src="https://i.pinimg.com/originals/7c/fa/4a/7cfa4a5203ff965e1c7e83d700391b54.jpg" alt=""/>
        </GalleryItem>
      </Gallery>

      <Swiper className={styles.swiper}>
        <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide><SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
}
