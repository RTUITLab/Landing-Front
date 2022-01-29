import styles from './Gallery.module.scss'
import {useEffect, useRef, useState} from "react";
import {isMobile} from "../other";

interface GalleryItemProps{
  children:any
}

export function GalleryItem({children}:GalleryItemProps){

  return(
    <div className={styles.galleryItem} draggable={false}>
      {children}
    </div>
  )
}


interface GalleryProps {
  children: any,
  active?: number,
  onMouseDown?:(e:any)=>void,
  onMouseUp?:(e:any)=>void,
  onChange?:(e:number)=>void
}

var localActiveView=0
var ratio=200
var lastX = 0;
var newX = 0;

export default function Gallery({children, active = 0,onMouseDown=(e)=>{},onMouseUp=(e)=>{},onChange=(e)=>{}}: GalleryProps) {
  const elem: any = useRef<any>()


  const calculateScale = (x: number,n?:number) => {
    if(localActiveView==0  && (newX-lastX)>0 && n!==undefined){
      return 1 - 0.2*n
    } else if(localActiveView==elem.current.children.length-1  && (newX-lastX)<0 && n!==undefined){
      return 1 - 0.2*n
    }
    return 1 - 0.2 * Math.abs(x) / ratio
  }
  const calculateX = (x: number, n?:number) => {
    if(localActiveView==0  && (newX-lastX)>0 && n!==undefined){
      return ((Math.pow(x/1.2,2/3))+(ratio*n-Math.pow(ratio*n,2/3))/1.2)
    } else if(localActiveView==elem.current.children.length-1  && (newX-lastX)<0 && n!==undefined){
      return (-(Math.pow(-x/1.2,2/3))-(ratio*n-Math.pow(ratio*n,2/3))/1.2)
    }

    return x / 1.2
  }

  const clearStyles=(i:number)=>{
    let childrens=document.querySelectorAll("."+styles.parent+" > *")
    childrens.forEach((e:any, index:number)=>{
      e.style.opacity="0"
      if(index<i){
        e.style.transform = `translate(${calculateX(-ratio*2-20)}px,0px) scale(${calculateScale(-2*ratio-20)})`
      }else{
        e.style.transform = `translate(${calculateX(2*ratio+20)}px,0px) scale(${calculateScale(2*ratio+20)})`
      }
    })
  }
  const setZ=(i:number)=>{
    let current: any = elem.current.children[i]
    current.style.zIndex=5
    if(current.previousSibling){
      current.previousSibling.style.zIndex=4
      if(current.previousSibling.previousSibling)
        current.previousSibling.previousSibling.style.zIndex=3
    }
    if(current.nextSibling){
      current.nextSibling.style.zIndex=4
      if(current.nextSibling.nextSibling)
        current.nextSibling.nextSibling.style.zIndex=3
    }
  }

  const setOpacity=(i:number)=>{
    let childrens=document.querySelectorAll("."+styles.parent+" > *")
    childrens.forEach((e:any, index:number)=>{
      e.style.opacity="0"
    })
    let current: any = elem.current.children[i]
    current.style.opacity=1
    if(current.previousSibling){
      current.previousSibling.style.opacity=1
      if(current.previousSibling.previousSibling)
        current.previousSibling.previousSibling.style.opacity=1
    }
    if(current.nextSibling){
      current.nextSibling.style.opacity=1
      if(current.nextSibling.nextSibling)
        current.nextSibling.nextSibling.style.opacity=1
    }
  }
  const setCurrentActivePanel=(i:number)=>{
    let current: any = elem.current.children[i]
    localActiveView=i
    clearStyles(i)
    setZ(i)
    setOpacity(i)
    current.style.transform=""
    if (current.previousSibling) {
      current.previousSibling.style.transform = `translate(${calculateX(-ratio)}px,0px) scale(${calculateScale(ratio)})`
      if (current.previousSibling.previousSibling) {
        current.previousSibling.previousSibling.style.transform = `translate(${calculateX(-2*ratio)}px,0px) scale(${calculateScale(2*ratio)})`
      }
    }
    if (current.nextSibling) {
      current.nextSibling.style.transform = `translate(${calculateX(ratio)}px,0px) scale(${calculateScale(ratio)})`
      if (current.nextSibling.nextSibling) {
        current.nextSibling.nextSibling.style.transform = `translate(${calculateX(2*ratio)}px,0px) scale(${calculateScale(2*ratio)})`
      }
    }
  }

  const setTransform=(i:number)=>{
    let current: any = elem.current.children[i]

    let l=0
    let t=current.previousSibling
    while(t){
      l++
      t.style.transform = `translate(${calculateX(newX - lastX - ratio*l,l)}px,0px) scale(${calculateScale(newX - lastX - ratio*l,l)})`
      t=t.previousSibling
    }

    t=current.nextSibling
    l=0
    while(t){
      l++
      t.style.transform = `translate(${calculateX(newX - lastX + ratio*l,l)}px,0px) scale(${calculateScale(newX - lastX + ratio*l,l)})`
      t=t.nextSibling
    }
  }

  const onTouchMove=()=>{
    let buff=localActiveView+Math.round(((lastX-newX)/ratio))
    if(buff>=0 && elem.current.children.length>buff){
      setZ(buff)
      setOpacity(buff)
      onChange(buff)
    }
    let current: any = elem.current.children[localActiveView]
    current.style.transform = `translate(${calculateX(newX - lastX,0)}px,0px) scale(${calculateScale(newX - lastX,0)})`
    setTransform(localActiveView)
  }
  const onTouchEnd=()=>{
    elem.current.ontouchmove = null
    elem.current.classList.add(styles.anim)
    let buff=localActiveView+Math.round(((lastX-newX)/ratio))
    if(buff>=0 && elem.current.children.length>buff){
      setCurrentActivePanel(buff)
      onChange(buff)

    }else{
      if(buff<0) {
        setCurrentActivePanel(0)
        onChange(0)
      }
      else {
        setCurrentActivePanel(elem.current.children.length - 1)
        onChange(elem.current.children.length - 1)
      }
    }
    setTimeout(()=>{
      elem.current.classList.remove(styles.anim)
    },250)
  }


  useEffect(() => {
    elem.current.classList.add(styles.anim)

    setCurrentActivePanel(active)
    if(window.innerWidth<1000){
      ratio=100
      setTransform(active)
    }
    if(window.innerWidth<700){
      ratio=50
      setTransform(active)
    }
    // elem.current.classList.remove(styles.anim)

    window.addEventListener("resize",()=>{
      if(window.innerWidth<1000){
        ratio=100
        setTransform(localActiveView)
        if(window.innerWidth<700){
          ratio=50
          setTransform(localActiveView)
        }else{
          ratio=100
        }
      }else{
        ratio=200
      }
      setCurrentActivePanel(localActiveView)

    })
    if(isMobile()){
      elem.current.ontouchstart = (e: any) => {
        lastX = e.touches[0].clientX
        onMouseDown(e)
        elem.current.ontouchmove = (e: any) => {
          newX = e.touches[0].clientX
          onTouchMove()
        }
      }
      window.addEventListener("touchend",(e: any) => {
        elem.current.ontouchmove=null
        onMouseUp(e)
        onTouchEnd()
      })
    }else{
      elem.current.onmousedown = (e: any) => {
        lastX = e.clientX
        onMouseDown(e)
        elem.current.onmousemove = (e: any) => {
          newX = e.clientX
          onTouchMove()
        }
      }
      window.addEventListener("mouseup",(e: any) => {
        elem.current.onmousemove=null
        onMouseUp(e)
        onTouchEnd()
      })
    }
  }, [])

  useEffect(()=>{
    elem.current.classList.add(styles.anim)
    if(active>=0 && elem.current.children.length>active){
      setCurrentActivePanel(active)
      localActiveView=active
    }else{
      setCurrentActivePanel(localActiveView)
    }
    setTimeout(()=>{
      elem.current.classList.remove(styles.anim)
    },250)
  },[active])

  return (
    <div draggable={false} className={styles.parent} ref={elem}>
      {children}
    </div>
  )
}

