import styles from "./About.module.scss";
import React, { useEffect } from "react";
// @ts-ignore
import Parallax from "parallax-js";

export default function About() {
  let lastEnable = true;
  useEffect(function () {
    let parallaxInstance = new Parallax(document.getElementById("scene"));

    if (window.innerWidth < 850) {
      parallaxInstance.destroy();
      lastEnable = false;
    } else {
      lastEnable = true;
      parallaxInstance = new Parallax(document.getElementById("scene"));
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth < 850) {
        if (lastEnable) {
          parallaxInstance.destroy();
        }
        lastEnable = false;
      } else {
        if (!lastEnable) {
          parallaxInstance = new Parallax(document.getElementById("scene"));
        }
        lastEnable = true;
      }
    });
  }, []);

  return (
    <article className={styles.aboutParent} id={"about"}>
      <section className={styles.content}>
        <section className={styles.logoAndName}>
          <img
            className={styles.logo}
            src="/images/logo.svg"
            alt="Логотип лаборатории"
          />
          <h1>RTUITLab</h1>
        </section>
        <div className={styles.text}>
          Лаборатория RTUITLab появилась в 2016 году в стенах Института
          Информационных Технологий РТУ МИРЭА. Тогда это была группа
          энтузиастов, которые пробовали свои силы в освоении новых технологий,
          ездили на первые выставки и хакатоны.
        </div>
      </section>

      <section
        data-relative-input={"true"}
        id="scene"
        className={styles.backgroundParallax}
      >
        <img
          data-depth="0.6"
          src="/images/htc_vive.webp"
          alt="Очки виртуальной реальности Htc Vive"
        />
        <img
          data-depth="0.8"
          src="/images/hololens.webp"
          alt="Очки дополненной реальности Hololens"
        />

        <img
          srcSet="
          /images/backgroundCompressed.webp 2000w
          "
          src="/images/background.webp"
          alt=""
          data-depth="0.3"
          className={styles.background}
        />
      </section>
    </article>
  );
}
