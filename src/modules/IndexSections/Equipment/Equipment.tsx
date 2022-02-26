import styles from './Equipment.module.scss'
import {useEffect, useState} from "react";
import React from 'react';


export default function Equipment() {
  const [data, setData] = useState([[]])
  const [showMore, setShowMore] = useState(true)

  useEffect(function () {
    fetch("/equipment.json")
      .then((data) => data.json())
      .then((result) => {
        let buff = [[]]
        result.forEach((e: never, i: number) => {
          if (i % 8 === 0) {
            buff.push([])
          }
          buff[Math.floor(i / 8)].push(e)
        })
        setData(buff)
      })
  }, [])


  return (
    <div name={"#test"} className={styles.parent}>
      <div className={styles.content}>
        <h1>Оборудование</h1>
        <DataMap data={data} showMore={showMore}/>
      </div>
      {showMore ? (
        <button onClick={() => {
          setShowMore(false)
        }}>Показать еще</button>) : (
        null
      )}
    </div>
  )
}

function DataMap(props:any) {
  const {data, showMore} = props
  const [mapData, setMapData] = useState(data)

  useEffect(()=>{
    if (showMore)
      setMapData(data.slice(0, 1))
    else
      setMapData(data)
  },[data])
  useEffect(()=>{
    if (showMore)
      setMapData(data.slice(0, 1))
    else
      setMapData(data)
  },[showMore])

  const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  return (
    <React.Fragment>
      {mapData.map((e:object[], i:number) => {
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
    </React.Fragment>
  )
}
