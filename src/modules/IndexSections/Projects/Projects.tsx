import React, { useEffect, useState } from "react";
import Gallery, { GalleryItem } from "../../../components/Gallery/Gallery";
import StatusBar from "../../../components/StatusBar/StatusBar";
import styles from "./Projects.module.scss";
import { ProjectsData } from "./ProjectsData";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewGallery, setViewGallery] = useState(false);
  const Tabs = ["Backend", "Frontend", "VR", "AR", "Machine Learning"];
  const [activeView, setActiveView] = useState(0);
  const [galleryBuff, setGalleryBuff] = useState(0);
  let initData: ProjectsData[] = [
    {
      title: "TITLE",
      description: "DESC",
      images: ["/images/background.webp"],
      videos: [],
      tags: ["FrontEnd"],
      tech: ["FrontEnd"],
      developers: ["FIO"],
      site: "fdfdsf",
      sourceCode: [{ name: "NAME", link: "fdfd" }],
      date: "02.03.2002",
    },
  ];
  const [data, setData] = useState(initData);

  useEffect(() => {
    setViewGallery(false);
    setTimeout(() => {
      setViewGallery(true);
    }, 300);
  }, [activeTab]);

  useEffect(() => {
    /*
fetch("https://files.rtuitlab.dev/landing_src/projects_data/").then(
      (result) => {
        console.log(result);
      }
    );
    */
  }, []);

  return (
    <article className={styles.projectsParent} id={"projects"}>
      <main className={styles.content}>
        <h1>Проекты</h1>
        <article className={styles.text}>
          Чем мы занимаемся? Мы создаем программные продукты, которые
          используются в различных сферах деятельности и выводят образовательный
          процесс на новый уровень. Команды Reality из RTUITLab многократные
          победители хакатонов и конференций. Многие сотрудники являются
          преподавателями образовательных программ, которые Институт ИТ проводит
          в сотрудничестве с компаниями Яндекс, Samsung и другими, а также
          преподают на внутренних кафедрах Института.
        </article>
        <section className={styles.tags}>
          {Tabs.map((e, i) => {
            return (
              <div
                key={i}
                active={(activeTab === i).toString()}
                onClick={() => setActiveTab(i)}
              >
                {e}
              </div>
            );
          })}
        </section>
        <section
          className={styles.galleryParent}
          hide={(!viewGallery).toString()}
        >
          <Gallery
            active={galleryBuff}
            onChange={(i) => {
              setActiveView(i);
            }}
          >
            {data.map((e: ProjectsData, i: number) => {
              return (
                <React.Fragment key={i}>
                  <GalleryItem>
                    <img draggable={false} src={e.images[0]} alt="" />
                  </GalleryItem>
                </React.Fragment>
              );
            })}
          </Gallery>
          <StatusBar
            count={data.length}
            onChange={(i) => {
              /*
                Функция отлавливает изменения в статус баре и устанавливает их в переменную galleryBuff
                При изменении этой переменной, галерея изменяет слайд. Но сам galleryBuff не изменяется
                при скролле галереи.
             */

              setActiveView(i);
              if (galleryBuff === i) {
                setGalleryBuff(activeView);
                setTimeout(() => {
                  /*

                Этот таймаут необходим для синхронизации состояния галереи и состояния статус бара.
                Изменить слайд галереи можно только через galleryBuff. Но сам при скролле он не изменяется
                Поэтому, если galleryBuff будет равен i, и мы захотим изменить его на этот же i,
                то изменений не произойдет и галерея не откроет нужный слайд.

                 */
                  setGalleryBuff(i);
                }, 15);
              } else {
                setGalleryBuff(i);
              }
            }}
            active={activeView}
          />
        </section>
      </main>
    </article>
  );
}
