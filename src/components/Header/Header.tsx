import styles from './Header.module.scss'
import React, {useEffect, useRef, useState} from "react";


export default function Header() {

  const pages = [
    {title: "О НАС"},
    {title: "ПРОЕКТЫ"},
    {title: "УСТРОЙСТВА"},
    {title: "ДОСТИЖЕНИЯ"},
    {title: "СОТРУДНИКИ"},
    {title: "КОНТАКТЫ"},
  ]

  const [active, setActive] = useState(0)
  const activeRef = useRef(active)
  const elemsParent: React.RefObject<any> = useRef<HTMLDivElement>()
  const line: React.RefObject<any> = useRef<HTMLDivElement>()
  const parentContainer: React.RefObject<any> = useRef<HTMLDivElement>()
  const [isMobile, setIsMobile] = useState(false)
  const [scroll, setScroll] = useState(false)
  const [show, setShow] = useState(false)

  function setLineProperties(i?: number) {
    let obj = elemsParent.current.children[active]
    if (i !== undefined) {
      obj = elemsParent.current.children[i]
    }
    line.current.style.marginLeft = obj.offsetLeft + "px"
    line.current.style.width = obj.offsetWidth + "px"
  }

  function onMouseElemEnter(i: number) {
    setLineProperties(i)
  }

  function onMouseElemLeave() {
    setLineProperties(active)
  }

  function onElementsParentClick(e:any) {
    if (isMobile) {
      setShow(false)
    }
  }

  function onElementClick(i: number,e:any) {
    setActive(i)
    onElementsParentClick(null)
  }

  useEffect(()=>{
    setLineProperties(active)
    window.addEventListener("resize",()=>{
      if(window.innerWidth<850){
        setIsMobile(true)
      }else{
        setIsMobile(false)
        setShow(false)
        setLineProperties(activeRef.current)
      }
    })
    window.addEventListener("scroll",()=>{
      if(window.scrollY>50){
        setScroll(true)
      }else{
        setScroll(false)
      }
    })
  }, [])
  useEffect(()=>{
    setLineProperties(active)
    activeRef.current=active
  }, [active])



  return (
    <div className={styles.headerParent} scroll={scroll.toString()} ref={parentContainer}>
      <div onClick={() => {
        setShow(!show)
      }}>
        <img src="/images/logo.png" alt=""/>
      </div>
      <div>
        <div show={show.toString()} className={styles.elementsParent}
             ref={elemsParent} onMouseLeave={onMouseElemLeave}>
          {pages.map((e, i) => {
            return (
              <div key={"headerElem" + i.toString()} className={styles.element} onMouseEnter={() => onMouseElemEnter(i)}
                   onClick={(e) => onElementClick(i,e)}>
                {e.title}
              </div>
            )
          })}
          {isMobile?(
            <div style={{backgroundColor:"transparent",height:"100%",width:"100vw"}} onClick={onElementsParentClick}></div>
            ):null}
        </div>
        <div className={styles.line} ref={line}></div>
      </div>
    </div>
  )
}
