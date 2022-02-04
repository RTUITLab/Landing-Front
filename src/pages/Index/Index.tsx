import React, {useEffect, useRef, useState} from "react";
import About from "../../modules/IndexSections/About/About";
import Header from "../../components/Header/Header";
import Projects from "../../modules/IndexSections/Projects/Projects";
import Achievements from "../../modules/IndexSections/Achievements/Achievements";

export default function Index(props: any) {

  useEffect(() => {
  }, [])
  return (
    <div>
      <Header/>
      <About/>
      <Projects/>
      <Achievements/>
    </div>
  )
}
