import { useEffect, useRef } from "react";
import { isMobile } from "../other";
import styles from "./Gallery.module.scss";
import { GalleryItemProps, GalleryProps } from "./types";

export function GalleryItem({ children, hide = false }: GalleryItemProps) {
  return (
    <div
      className={styles.galleryItem + " noselect"}
      hide={hide.toString()}
      draggable={false}
    >
      {children}
    </div>
  );
}

export default function Gallery({
  children,
  active = 0,
  onMouseDown = () => {},
  onMouseUp = () => {},
  onChange = () => {},
}: GalleryProps) {
  const localActiveView = useRef(0);
  let ratio: number = 200;
  let lastX = 0;
  let newX = 0;

  const elem: any = useRef<any>();

  const calculateScale = function (x: number, n?: number) {
    if (localActiveView.current == 0 && newX - lastX > 0 && n !== undefined) {
      return 1 - 0.2 * n;
    } else if (
      localActiveView.current == elem.current.children.length - 1 &&
      newX - lastX < 0 &&
      n !== undefined
    ) {
      return 1 - 0.2 * n;
    }
    return 1 - (0.2 * Math.abs(x)) / ratio;
  };
  const calculateX = function (x: number, n?: number) {
    if (localActiveView.current == 0 && newX - lastX > 0 && n !== undefined) {
      return (
        Math.pow(x / 1.2, 2 / 3) +
        (ratio * n - Math.pow(ratio * n, 2 / 3)) / 1.2
      );
    } else if (
      localActiveView.current == elem.current.children.length - 1 &&
      newX - lastX < 0 &&
      n !== undefined
    ) {
      return (
        -Math.pow(-x / 1.2, 2 / 3) -
        (ratio * n - Math.pow(ratio * n, 2 / 3)) / 1.2
      );
    }

    return x / 1.2;
  };

  const clearStyles = function (i: number) {
    let children = elem.current.querySelectorAll("." + styles.parent + " > *");
    children.forEach((e: any, index: number) => {
      e.style.opacity = "0";
      if (index < i) {
        e.style.transform = `translate(${calculateX(
          -ratio * 2 - 20
        )}px,0px) scale(${calculateScale(-2 * ratio - 20)})`;
      } else {
        e.style.transform = `translate(${calculateX(
          2 * ratio + 20
        )}px,0px) scale(${calculateScale(2 * ratio + 20)})`;
      }
    });
  };
  const setZ = function (i: number) {
    let current: any = elem.current.children[i];
    current.style.zIndex = 5;
    if (current.previousSibling) {
      current.previousSibling.style.zIndex = 4;
      if (current.previousSibling.previousSibling)
        current.previousSibling.previousSibling.style.zIndex = 3;
    }
    if (current.nextSibling) {
      current.nextSibling.style.zIndex = 4;
      if (current.nextSibling.nextSibling)
        current.nextSibling.nextSibling.style.zIndex = 3;
    }
  };

  const setOpacity = function (i: number) {
    let children = elem.current.querySelectorAll("." + styles.parent + " > *");
    children.forEach((e: any) => {
      e.style.opacity = "0";
    });
    let current: any = elem.current.children[i];
    current.style.opacity = 1;
    if (current.previousSibling) {
      current.previousSibling.style.opacity = 1;
      if (current.previousSibling.previousSibling)
        current.previousSibling.previousSibling.style.opacity = 1;
    }
    if (current.nextSibling) {
      current.nextSibling.style.opacity = 1;
      if (current.nextSibling.nextSibling)
        current.nextSibling.nextSibling.style.opacity = 1;
    }
  };
  const setCurrentActivePanel = function (i: number) {
    let current: any = elem.current.children[i];
    localActiveView.current = i;
    clearStyles(i);
    setZ(i);
    setOpacity(i);
    current.style.transform = "";
    current.style.filter = "";
    if (current.previousSibling) {
      current.previousSibling.style.transform = `translate(${calculateX(
        -ratio
      )}px,0px) scale(${calculateScale(ratio)})`;
      // current.previousSibling.style.filter = `brightness(0.5)`
      if (current.previousSibling.previousSibling) {
        current.previousSibling.previousSibling.style.transform = `translate(${calculateX(
          -2 * ratio
        )}px,0px) scale(${calculateScale(2 * ratio)})`;
        // current.previousSibling.previousSibling.style.filter = `brightness(0.5)`
      }
    }
    if (current.nextSibling) {
      current.nextSibling.style.transform = `translate(${calculateX(
        ratio
      )}px,0px) scale(${calculateScale(ratio)})`;
      // current.nextSibling.style.filter = `brightness(0.5)`
      if (current.nextSibling.nextSibling) {
        current.nextSibling.nextSibling.style.transform = `translate(${calculateX(
          2 * ratio
        )}px,0px) scale(${calculateScale(2 * ratio)})`;
        // current.nextSibling.nextSibling.style.filter = `brightness(0.5)`
      }
    }
  };

  const setTransform = function (i: number) {
    let current: any = elem.current.children[i];

    let l = 0;
    let t = current.previousSibling;
    while (t) {
      l++;
      if (l > 2 && false) {
        t.style.transform = `translate(${0}px,0px) scale(${0})`;
      } else {
        t.style.transform = `translate(${calculateX(
          newX - lastX - ratio * l,
          l
        )}px,0px) scale(${calculateScale(newX - lastX - ratio * l, l)})`;
      }
      t = t.previousSibling;
    }

    t = current.nextSibling;
    l = 0;
    while (t) {
      l++;
      if (l > 2 && false) {
        t.style.transform = "translate(0px,0px) scale(0)";
      } else {
        t.style.transform = `translate(${calculateX(
          newX - lastX + ratio * l,
          l
        )}px,0px) scale(${calculateScale(newX - lastX + ratio * l, l)})`;
      }
      t = t.nextSibling;
    }
  };

  const onTouchMove = function () {
    let buff = localActiveView.current + Math.round((lastX - newX) / ratio);
    if (buff >= 0 && elem.current.children.length > buff) {
      setZ(buff);
      setOpacity(buff);
      onChange(buff);
    }
    let current: any = elem.current.children[localActiveView.current];
    current.style.transform = `translate(${calculateX(
      newX - lastX,
      0
    )}px,0px) scale(${calculateScale(newX - lastX, 0)})`;
    setTransform(localActiveView.current);
  };
  const onTouchEnd = function () {
    elem.current.ontouchmove = null;
    elem.current.classList.add(styles.anim);
    let buff = localActiveView.current + Math.round((lastX - newX) / ratio);
    if (buff >= 0 && elem.current.children.length > buff) {
      setCurrentActivePanel(buff);
      onChange(buff);
    } else {
      if (buff < 0) {
        setCurrentActivePanel(0);
        onChange(0);
      } else {
        setCurrentActivePanel(elem.current.children.length - 1);
        onChange(elem.current.children.length - 1);
      }
    }
    setTimeout(() => {
      elem.current.classList.remove(styles.anim);
    }, 250);
  };

  function deleteEventListener(e: any) {
    elem.current.ontouchmove = null;
    elem.current.onmousemove = null;
    onMouseUp(e);
    onTouchEnd();
    if (isMobile()) {
      window.removeEventListener("touchend", deleteEventListener);
    } else {
      window.removeEventListener("mouseup", deleteEventListener);
    }
  }

  function calculateRatio() {
    const wd = window.innerWidth;

    if (wd > 1150) return 200;
    else if (wd > 1020) return 150;
    else if (wd > 820) return 130;
    else if (wd > 640) return 100;
    else if (wd > 520) return 80;
    else if (wd > 410) return 60;
    else return 40;
  }

  useEffect(function () {
    elem.current.classList.add(styles.anim);

    setCurrentActivePanel(active);
    ratio = calculateRatio();
    setTransform(localActiveView.current);
    window.addEventListener("resize", function () {
      ratio = calculateRatio();
      setTransform(localActiveView.current);
      setCurrentActivePanel(localActiveView.current);
    });
    if (isMobile()) {
      elem.current.ontouchstart = function (e: any) {
        elem.current.classList.remove(styles.anim);
        window.addEventListener("touchend", deleteEventListener, {
          passive: true,
        });
        lastX = e.touches[0].clientX;
        onMouseDown(e);
        elem.current.ontouchmove = function (e: any) {
          newX = e.touches[0].clientX;
          onTouchMove();
        };
      };
    } else {
      elem.current.onmousedown = function (e: any) {
        elem.current.classList.remove(styles.anim);
        window.addEventListener("mouseup", deleteEventListener, {
          passive: true,
        });
        lastX = e.clientX;
        onMouseDown(e);
        elem.current.onmousemove = function (e: any) {
          newX = e.clientX;
          onTouchMove();
        };
      };
    }
  }, []);

  useEffect(
    function () {
      if (active === localActiveView.current) return;

      elem.current.classList.add(styles.anim);
      if (active >= 0 && elem.current.children.length > active) {
        setCurrentActivePanel(active);
        localActiveView.current = active;
      } else {
        setCurrentActivePanel(localActiveView.current);
      }
      setTimeout(() => {
        elem.current.classList.remove(styles.anim);
      }, 250);
    },
    [active]
  );

  return (
    <div style={{ position: "relative", zIndex: "5" }}>
      <div draggable={false} className={styles.parent} ref={elem}>
        {children}
      </div>
    </div>
  );
}
