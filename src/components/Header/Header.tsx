import styles from './Header.module.scss'
import React, {useEffect, useRef, useState} from "react";
import {HeaderProps} from "./types";




export default function Header({appContainer}: HeaderProps) {
  /*
      Переменная, блокирующая изменение положения линии, которая
      подчеркивает активную вкладку.
   */
  const blockScrollChange = useRef(false)
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
  const parentContainer: React.RefObject<any> = useRef<HTMLDivElement>()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850)
  const [scroll, setScroll] = useState(false)
  const [show, setShow] = useState(false)


  function onElementsParentClick(e: any) {
    if (isMobile) {
      setShow(false)
    }
  }

  function onElementClick(i: number, e: any) {
    blockScrollChange.current = true
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
        top: elem.offsetTop - (isMobile ? parentContainer.current.offsetHeight-5 : 84),
        behavior: 'smooth',
      })
    }


    /*
        Блокируем изменение положения линии подчеркивания
     */
    setTimeout(() => {
      blockScrollChange.current = false
    }, 500)
  }

  useEffect(() => {

    function findActiveView(){
      let lastActive: any = 0
      for (let i = 0; i < appContainer.current.children.length - 1; i++) {
        let array = appContainer.current.children
        if (window.scrollY + window.innerHeight / 2 >= array[i + 1].offsetTop) {
          lastActive = i
        }
      }
      return lastActive
    }

    if(window.scrollY>50)
      setScroll(true)
    setActive(findActiveView())

    window.addEventListener("resize", () => {
      if (window.innerWidth < 850) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
        setShow(false)
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
      if (!blockScrollChange.current) {
        setActive(findActiveView())
      }
    }, {passive: true})
  }, [])
  useEffect(() => {
    activeRef.current = active
  }, [active])


  return (
    <div className={styles.headerParent+" noselect"} scroll={scroll.toString()} ref={parentContainer}>
      <div onClick={() => {
        if(window.innerWidth < 850)
          setShow(!show)
      }}>
        <img src="/images/logo.webp" alt=""/>
      </div>
      <div>
        <div show={show.toString()} className={styles.elementsParent}
             ref={elemsParent}>
          {pages.map((e, i) => {
            return (
              <div active={(i===active).toString()} key={"headerElem" + i.toString()} className={styles.element}
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
      </div>
      <div onClick={()=>setShow(false)}  show={show.toString()} className={styles.backgroundElement}></div>

    </div>
  )
}
