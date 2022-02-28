import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { HeaderProps } from "./types";

export default function Header({ appContainer }: HeaderProps) {
  /*
      Переменная, блокирующая изменение положения линии, которая
      подчеркивает активную вкладку.
   */
  const blockScrollChange = useRef(false);
  const pages = [
    { title: "О НАС", secName: "about" },
    { title: "ПРОЕКТЫ", secName: "projects" },
    { title: "ДОСТИЖЕНИЯ", secName: "achievemtns" },
    { title: "ОБОРУДОВАНИЕ", secName: "equipment" },
    { title: "СОТРУДНИКИ", secName: "staff" },
    { title: "КОНТАКТЫ", secName: "contacts" },
  ];

  /*
      Страшно много констант...

      ... но они все нужны :)
   */
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  const elemsParent: React.RefObject<any> = useRef<HTMLDivElement>();
  const parentContainer: React.RefObject<any> = useRef<HTMLDivElement>();
  const [scroll, setScroll] = useState(false);
  const inputRef = useRef<any>();

  useEffect(() => {
    function findActiveView() {
      let lastActive: any = 0;
      for (let i = 0; i < appContainer.current.children.length - 1; i++) {
        let array = appContainer.current.children;
        if (window.scrollY + window.innerHeight / 2 >= array[i + 1].offsetTop) {
          lastActive = i;
        }
      }
      return lastActive;
    }

    if (window.scrollY > 50) setScroll(true);
    setActive(findActiveView());

    window.addEventListener(
      "scroll",
      () => {
        scrollFunction(setScroll, blockScrollChange, setActive, findActiveView);
      },
      { passive: true }
    );
  }, []);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  return (
    <div
      className={styles.headerParent + " noselect"}
      scroll={scroll.toString()}
      ref={parentContainer}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={"showMenu"}
        className={styles.menuCheckBox}
      />
      <label htmlFor="showMenu">
        <img src="/images/logo.webp" alt="" />
      </label>
      <div className={styles.elementsParent} ref={elemsParent}>
        {pages.map((e, i) => {
          return (
            <a
              active={(i === active).toString()}
              key={"headerElem" + i.toString()}
              className={styles.element}
              href={"#" + e.secName}
              onClick={() => (inputRef.current.checked = false)}
            >
              {e.title}
            </a>
          );
        })}
      </div>
      <label htmlFor="showMenu">
        <div className={styles.backgroundPanelParent}>
          <div></div>
        </div>
      </label>
    </div>
  );
}
function scrollFunction(
  setScroll: React.Dispatch<React.SetStateAction<boolean>>,
  blockScrollChange: React.MutableRefObject<boolean>,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  findActiveView: () => any
) {
  if (window.scrollY > 50) {
    setScroll(true);
  } else {
    setScroll(false);
  }

  /*
    Када мы скроллим и появляемся над другой секцией...

    ... в общем надо определить положение линии подчеркивания
    и все ето здесь
 */
  if (!blockScrollChange.current) {
    setActive(findActiveView());
  }
}
