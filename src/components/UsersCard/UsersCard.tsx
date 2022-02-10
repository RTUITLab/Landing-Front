import styles from './UsersCard.module.scss'
import {UsersCardProps} from './UsersCardProps'

export default function UsersCard({fio, tags, img}:UsersCardProps){

  return(
    <div className={styles.parent}>
      <img src={img} alt={`Фото сотрудника ${fio}`}/>
      <div className={styles.info}>
        <div className={styles.fio}>
          {fio}
        </div>
        <div className={styles.tagsParent}>
          {tags.map((e,i)=>{

            return(
              <div key={i}>
                {e}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
