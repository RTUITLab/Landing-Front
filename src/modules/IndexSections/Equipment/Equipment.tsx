import styles from './Equipment.module.scss'
import {EquipmentProps} from "./types";
import {useEffect, useState} from "react";


export default function Equipment() {
  const [data, setData] = useState([[]])
  const [showMore, setShowMore] = useState(true)
  const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  function showItems(n: number) {
    let dataBuff: any = [[]]
    let i = 0;
    let interval = setInterval(function () {
      if (i === n) {
        dataBuff = dataBuff.filter((e: any) => e.length > 0)
        setData([...dataBuff])
        clearInterval(interval)
      } else {
        if (i % 8 === 0) {
          dataBuff.push([])
        }
        dataBuff[Math.floor(i / 8)].push(i)
        i++;
      }
    }, 0)
  }

  useEffect(function () {
    showItems(5)
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className={styles.parent}>
      <div className={styles.content}>
        <h1>Оборудование</h1>
        {data.map((e, i) => {
          let lastelem = "false"
          if (e.length < 8)
            lastelem = "true"
          return (
            <div key={i} className={styles.elements} invert={((i + 1) % 2 === 0).toString()} lastelem={lastelem}>
              {e.map((k, j) => {
                return (
                  <div className={styles.element} key={j} style={{gridArea: arr_EN[j]}}>f</div>
                )
              })}
            </div>
          )
        })}
      </div>
      {showMore? (
        <button onClick={() => {
          setShowMore(false)
          showItems(20)
        }}>Показать еще</button>) : (
        null
      )}
    </div>
  )
}
