import styles from './AchievementCard.module.scss'
import {AchievementCardProps} from './types'
import React from "react";

export default function AchievementCard({title, desc, cover, link}: AchievementCardProps) {


  return (
    <div className={styles.parent}>
      <h1>{title}</h1>
      <article className={styles.desc}>
        <p>{desc}</p>
      </article>
      <a href={link}>Подробнее</a>
      <img src={cover} alt="Обложка достижения"/>
    </div>
  )
}
