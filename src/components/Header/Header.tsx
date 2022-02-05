import styles from './Header.module.scss'
import React, {useEffect, useRef, useState} from "react";
import {HeaderProps} from "./types";


/*
    Переменная, блокирующая изменение положения линии, которая
    подчеркивает активную вкладку.

    Зачем здесь и почему var а не let?
    Чтобы было видео во всех eventListener-ах
 */
var blockScrollChange = false

export default function Header({appContainer}: HeaderProps) {

  const pages = [
    {title: "О НАС"},
    {title: "ПРОЕКТЫ"},
    {title: "ДОСТИЖЕНИЯ"},
    {title: "ОБОРУДОВАНИЕ"},
    {title: "СОТРУДНИКИ"},
    {title: "КОНТАКТЫ"},
  ]


  /*
      Страшно много констант...

      ... но они все нужны :)
   */
  const [active, setActive] = useState(0)
  const activeRef = useRef(active)
  const elemsParent: React.RefObject<any> = useRef<HTMLDivElement>()
  const line: React.RefObject<any> = useRef<HTMLDivElement>()
  const parentContainer: React.RefObject<any> = useRef<HTMLDivElement>()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850)
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

  function onElementsParentClick(e: any) {
    if (isMobile) {
      setShow(false)
    }
  }

  function onElementClick(i: number, e: any) {
    blockScrollChange = true
    setActive(i)
    onElementsParentClick(null)
    if (i === 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      let elem = appContainer.current.children[i + 1]
      window.scrollTo({
        top: elem.offsetTop - (isMobile ? parentContainer.current.offsetHeight : 84),
        behavior: 'smooth',
      })
    }


    /*
        Блокируем изменение положения линии подчеркивания
     */
    setTimeout(() => {
      blockScrollChange = false
    }, 500)
  }

  useEffect(() => {
    setLineProperties(active)
    window.addEventListener("resize", () => {
      if (window.innerWidth < 850) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
        setShow(false)
        setLineProperties(activeRef.current)
      }
    })
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }


      /*
          Када мы скроллим и появляемся над другой секцией...

          ... в общем надо определить положение линии подчеркивания
          и все ето здесь
       */
      if (!blockScrollChange) {
        let lastActive: any = 0
        for (let i = 0; i < appContainer.current.children.length - 1; i++) {
          let array = appContainer.current.children
          if (window.scrollY + window.innerHeight / 2 >= array[i + 1].offsetTop) {
            lastActive = i
          }
        }
        setActive(lastActive)
      }
    })
  }, [])
  useEffect(() => {
    setLineProperties(active)
    activeRef.current = active
  }, [active])


  return (
    <div className={styles.headerParent} scroll={scroll.toString()} ref={parentContainer}>
      <div onClick={() => {
        setShow(!show)
      }}>
        <img src="/images/logo.webp" alt=""/>
      </div>
      <div>
        <div show={show.toString()} className={styles.elementsParent}
             ref={elemsParent} onMouseLeave={onMouseElemLeave}>
          {pages.map((e, i) => {
            return (
              <div key={"headerElem" + i.toString()} className={styles.element} onMouseEnter={() => onMouseElemEnter(i)}
                   onClick={(e) => onElementClick(i, e)}>
                {e.title}
              </div>
            )
          })}
          {isMobile ? (
            <div style={{backgroundColor: "transparent", height: "100%", width: "100vw"}}
                 onClick={onElementsParentClick}></div>
          ) : null}
        </div>
        <div className={styles.line} ref={line}></div>
      </div>
    </div>
  )
}
