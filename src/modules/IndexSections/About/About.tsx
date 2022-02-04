import styles from './About.module.scss'
import React, {useEffect, useRef, useState} from "react";
var lastEnable = true

export default function About() {
  useEffect(() => {
    const Parallax = require('parallax-js')
    var parallaxInstance = new Parallax(document.getElementById("scene"));

    if(window.innerWidth<850){
      parallaxInstance.disable()
    }else{
      parallaxInstance.enable()
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
        <h1>О нас</h1>
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
        <img data-depth="0.6" src="/images/htc_vive.png" alt=""/>
        <img data-depth="0.8" src="/images/hololens.png" alt=""/>
        <img src="/images/background.png" alt="" data-depth="0.3" className={styles.background}/>
      </div>

      {/*<div data-relative-input="true" id="scene">*/}
      {/*  <div data-depth="0.3">My first Layer!</div>*/}
      {/*  <div data-depth="0.6">My first Layer!</div>*/}
      {/*</div>*/}
    </div>
  )
}

