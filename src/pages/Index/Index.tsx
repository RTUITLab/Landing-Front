import React, {useState} from "react";
import About from "../../modules/IndexSections/About/About";
import Header from "../../components/Header/Header";

export default function Index(props:any){
  const [state, setState]=useState(2)
  const [viewInfo,setViewInfo]=useState(true)

  return(
    <div>
      <Header/>
      <About/>
    </div>
  )
}
