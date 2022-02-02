import styles from './About.module.scss'
import {useEffect} from "react";

export default function About() {

  useEffect(() => {
    const Parallax = require('parallax-js')
    var parallaxInstance = new Parallax(document.getElementById("scene"));
  }, [])

  return (
    <div id={"ff"} className={styles.aboutParent}>
      <div data-relative-input="true" id="scene">
        <div data-depth="0.3">My first Layer!</div>
        <div data-depth="0.6">My first Layer!</div>
      </div>
    </div>
  )
}
