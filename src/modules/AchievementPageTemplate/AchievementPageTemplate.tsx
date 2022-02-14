import {Helmet} from "react-helmet";
import {AchievementPageTemplateProps} from "./types";
import styles from './AchievementPageTemplate.module.scss'
import React from "react";
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

export function GalleryProp(props:any){
  const pagination = {
    clickable: true,
    renderBullet: function (index:any, className:any) {
      return '<span class="'+className+'"></span>';
    },
  };
  return(
    <div id={"swiperParent"}>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        slidesPerView={"auto"}
        spaceBetween={15}

        className={styles.swiper}
      >
        {props.children.map((e:any, i:any)=>{
          return(
            <SwiperSlide key={i}>{e}</SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export function Head(props:any){
  return(
    <div className={styles.HeadProp}>
      {props.children}
    </div>
  )
}

export function Content(props:any){
  return(
    <div className={styles.ContentProp}>
      {props.children}
    </div>
  )
}

export default function AchievementPageTemplate({title, coverLink, desc, children=null}: AchievementPageTemplateProps) {
  return (
    <div className={styles.parent}>
      <Helmet
      title={"RTUITLab | "+title}
      >
        <meta property="og:title" content={"RTUITLab | "+title}/>
        <meta property="title" content={"RTUITLab | "+title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={coverLink}/>
        <meta property="og:description" content={desc}/>
      </Helmet>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
