import React, {Suspense, useEffect, useRef, useState} from "react";
import Header from "../../components/Header/Header";
import About from "../../modules/IndexSections/About/About";


export default function Index(props: any) {
  const appContainer: any = useRef<HTMLDivElement>()

  const Projects = React.lazy(() => import("../../modules/IndexSections/Projects/Projects"))
  const Achievements = React.lazy(() => import("../../modules/IndexSections/Achievements/Achievements"))
  const Equipment = React.lazy(()=>import("../../modules/IndexSections/Equipment/Equipment"))

  const Loader = () => {
    return(
      <div style={{textAlign:"center",padding:"30vh 0px"}}>
        Загрузка...
      </div>
    )
  }

  useEffect(() => {
  }, [])
  return (
    <div ref={appContainer}>
      <Header appContainer={appContainer}/>
      <About/>
      <Suspense fallback={<Loader/>}>
        <Projects/>
      </Suspense>
      <Suspense fallback={<Loader/>}>
        <Achievements/>
      </Suspense>
      <Suspense fallback={<Loader/>}>
        <Equipment/>
      </Suspense>
    </div>
  )
}
