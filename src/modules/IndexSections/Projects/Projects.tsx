import styles from './Projects.module.scss'
import Gallery, {GalleryItem} from "../../../components/Gallery/Gallery";
import {useEffect, useState} from "react";
import StatusBar from "../../../components/StatusBar/StatusBar";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0)
  const [viewGallery, setViewGallery] = useState(false)
  const Tabs=["Backend", "Frontend", "VR", "AR", "Machine Learning"]
  const [activeView, setActiveView] = useState(0)
  const [galleryBuff, setGalleryBuff] = useState(0)

  useEffect(()=>{
    setViewGallery(false)
    setTimeout(()=>{
      setViewGallery(true)
    },300)
  },[activeTab])

  return (
    <div className={styles.projectsParent}>
      <div className={styles.content}>
        <h1>Проекты</h1>
        <article className={styles.text}>
          Чем мы занимаемся? Мы создаем программные продукты, которые используются в различных сферах деятельности и
          выводят образовательный процесс на новый уровень. Команды Reality из RTUITLab многократные победители
          хакатонов и конференций. Многие сотрудники являются преподавателями образовательных программ, которые Институт
          ИТ проводит в сотрудничестве с компаниями Яндекс, Samsung и другими, а также преподают на внутренних кафедрах
          Института.
        </article>
        <div className={styles.tags}>
          {Tabs.map((e,i)=>{
            return <div key={i} active={(activeTab===i).toString()} onClick={()=>setActiveTab(i)}>{e}</div>
          })}
        </div>
        <div className={styles.galleryParent} hide={(!viewGallery).toString()}>
          <Gallery active={galleryBuff} onChange={(i)=>{
              setActiveView(i)
          }}>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.argoinvestigazioni.com/wp-content/uploads/2019/05/img-test8-bg.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://gemakjruntul.files.wordpress.com/2016/02/mkfscramfs.png" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.argoinvestigazioni.com/wp-content/uploads/2019/05/img-test8-bg.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://gemakjruntul.files.wordpress.com/2016/02/mkfscramfs.png" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.argoinvestigazioni.com/wp-content/uploads/2019/05/img-test8-bg.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://gemakjruntul.files.wordpress.com/2016/02/mkfscramfs.png" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.argoinvestigazioni.com/wp-content/uploads/2019/05/img-test8-bg.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://www.sideline.com/wp-content/uploads/2017/03/img-test600x400.jpg" alt=""/>
            </GalleryItem>
            <GalleryItem>
              <img draggable={false} src="https://gemakjruntul.files.wordpress.com/2016/02/mkfscramfs.png" alt=""/>
            </GalleryItem>
          </Gallery>
          <StatusBar count={16} onChange={(i)=>{

            /*
                Функция отлавливает изменения в статус баре и устанавливает их в переменную galleryBuff
                При изменении этой переменной, галерея изменяет слайд. Но сам galleryBuff не изменяется
                при скролле галереи.
             */

            setActiveView(i)
            if(galleryBuff===i){
              setGalleryBuff(activeView)
              setTimeout(()=>{
                /*

                Этот таймаут необходим для синхронизации состояния галереи и состояния статус бара.
                Изменить слайд галереи можно только через galleryBuff. Но сам при скролле он не изменяется
                Поэтому, если galleryBuff будет равен i, и мы захотим изменить его на этот же i,
                то изменений не произойдет и галерея не откроет нужный слайд.

                 */
                setGalleryBuff(i)
              },15)
            }else{
              setGalleryBuff(i)
            }
          }} active={activeView}/>
        </div>

      </div>
    </div>
  )
}
