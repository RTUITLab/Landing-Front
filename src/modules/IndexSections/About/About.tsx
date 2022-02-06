import styles from './About.module.scss'
import React, {useEffect, useRef, useState} from "react";
var lastEnable = true

export default function About() {
  useEffect(() => {
    const Parallax = require('parallax-js')
    var parallaxInstance = new Parallax(document.getElementById("scene"));

    if(window.innerWidth<850){
      parallaxInstance.destroy()
      lastEnable=false
    }else{
      lastEnable=true
      parallaxInstance = new Parallax(document.getElementById("scene"));
    }
    window.addEventListener("resize",()=>{
      if(window.innerWidth<850){
        if(lastEnable){
          parallaxInstance.destroy()

        }
        lastEnable=false

      }else{
        if(!lastEnable){
          parallaxInstance = new Parallax(document.getElementById("scene"));
        }
        lastEnable=true
      }
    })
  }, [])

  return (
    <div id={"ff"} className={styles.aboutParent}>
      <div className={styles.content}>
        <section className={styles.logoAndName}>
          <img className={styles.logo} src="/images/logo.svg" alt="Логотип лаборатории"/>
          <div>
            RTUITLab
          </div>
        </section>
        <div className={styles.text}>
          Лаборатория RTUITLab появилась в 2016 году в стенах Института Информационных Технологий РТУ МИРЭА. Тогда это
          была группа энтузиастов, которые пробовали свои силы в освоении новых технологий, ездили на первые выставки и
          хакатоны.
        </div>
      </div>
      <div data-relative-input={"true"} id="scene" className={styles.backgroundParallax}>
        <img data-depth="0.6" src="/images/htc_vive.webp" alt="Очки виртуальной реальности Htc Vive"/>
        <img data-depth="0.8" src="/images/hololens.webp" alt="Очки дополненной реальности Hololens"/>
        <img src="/images/background.webp" alt="" data-depth="0.3" className={styles.background}/>
      </div>
    </div>
  )
}

