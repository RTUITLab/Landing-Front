import styles from './AchievementCard.module.scss'
import {AchievementCardProps} from './types'
import React, {useRef} from "react";

export default function AchievementCard({title, desc, cover, link}:AchievementCardProps){



  return(
    <div className={styles.parent}>
      <h1>{title}</h1>
      <div className={styles.desc}>
        <div>{desc}</div>
      </div>
      <a href={link}>Подробнее</a>
      <img src={cover} alt="Обложка достижения"/>
    </div>
  )
}
