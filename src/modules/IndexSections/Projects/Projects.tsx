import styles from './Projects.module.scss'
import Gallery, {GalleryItem} from "../../../components/Gallery/Gallery";

export default function Projects() {

  return (
    <div className={styles.projectsParent}>
      <div className={styles.content}>
        <h1>Проекты</h1>
        <div className={styles.text}>
          Чем мы занимаемся? Мы создаем программные продукты, которые используются в различных сферах деятельности и
          выводят образовательный процесс на новый уровень. Команды Reality из RTUITLab многократные победители
          хакатонов и конференций. Многие сотрудники являются преподавателями образовательных программ, которые Институт
          ИТ проводит в сотрудничестве с компаниями Яндекс, Samsung и другими, а также преподают на внутренних кафедрах
          Института.
        </div>
        <Gallery>
          <GalleryItem>
            <div style={{backgroundColor:"black"}}>

            </div>
          </GalleryItem>
          <GalleryItem>
            <div style={{backgroundColor:"black"}}>

            </div>
          </GalleryItem>
          <GalleryItem>
            <div style={{backgroundColor:"black"}}>

            </div>
          </GalleryItem>
          <GalleryItem>
            <div style={{backgroundColor:"red"}}>

            </div>
          </GalleryItem>
        </Gallery>
      </div>
    </div>
  )
}
