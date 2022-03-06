import "./gallery.scss";

export function GalleryItem({ children, hide = false }) {
  return (
    <div
      className={"gallery__galleryItem noselect"}
      hide={hide.toString()}
      draggable={false}
    >
      {children}
    </div>
  );
}
export function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    window.innerWidth <= 850
  ) {
    return true;
  } else {
    return false;
  }
}
export default function gallery(elem, onMouseDown, onMouseUp, onChange) {
  let localActiveView = 0;
  let ratio = 200;
  let lastX = 0;
  let newX = 0;

  const calculateScale = function (x, n) {
    if (localActiveView == 0 && newX - lastX > 0 && n !== undefined) {
      return 1 - 0.2 * Math.abs(n);
    } else if (
      localActiveView == elem.children.length - 1 &&
      newX - lastX < 0 &&
      n !== undefined
    ) {
      return 1 - 0.2 * n;
    }
    return 1 - (0.2 * Math.abs(x)) / ratio;
  };
  const calculateX = function (x, n) {
    if (localActiveView == 0 && newX - lastX > 0 && n !== undefined) {
      return (
        Math.pow(x / 1.2, 2 / 3) +
        (ratio * Math.abs(n) - Math.pow(ratio * Math.abs(n), 2 / 3)) / 1.2
      );
    } else if (
      localActiveView == elem.children.length - 1 &&
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

  const clearStyles = function (i) {
    let children = elem.children;
    Array.from(children).forEach((e, index) => {
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
  const setZ = function (x) {
    const i = Number(x);
    let current = elem.children[i];
    if (!current) return;
    current.style.zIndex = 5;
    let childrenArr = Array.from(elem.children);

    if (i - 1 >= 0) {
      childrenArr[i - 1].style.zIndex = 4;
      if (i - 2 >= 0) childrenArr[i - 2].style.zIndex = 3;
    }
    if (i + 1 < childrenArr.length) {
      childrenArr[i + 1].style.zIndex = 4;
      if (i + 2 < childrenArr.length) childrenArr[i + 2].style.zIndex = 3;
    }
  };
  const setTransform = function (i) {
    let current = Array.from(elem.children);
    let l = 0;

    for (let j = i - 1; j >= 0; j--) {
      l++;
      current[j].style.transform = `translate(${calculateX(
        newX - lastX - ratio * l,
        l
      )}px,0px) scale(${calculateScale(newX - lastX - ratio * l, l)})`;
    }
    l = 0;
    for (let k = i + 1; k < current.length; k++) {
      l--;
      current[k].style.transform = `translate(${calculateX(
        newX - lastX - ratio * l,
        l
      )}px,0px) scale(${calculateScale(newX - lastX - ratio * l, l)})`;
    }
  };
  const setOpacity = function (x) {
    const i = Number(x);
    let children = elem.querySelectorAll(".gallery__parent > *");
    let childrenArr = Array.from(children);
    childrenArr.forEach((e) => {
      e.style.opacity = "0";
    });
    let current = elem.children[i];
    if (current) current.style.opacity = 1;
    if (i - 1 >= 0) {
      childrenArr[i - 1].style.opacity = 1;
      if (i - 2 >= 0) childrenArr[i - 2].style.opacity = 1;
    }
    if (i + 1 < childrenArr.length) {
      childrenArr[i + 1].style.opacity = 1;
      if (i + 2 < childrenArr.length) childrenArr[i + 2].style.opacity = 1;
    }
  };
  const setCurrentActivePanel = function (x) {
    const i = Number(x);
    let current = elem.children;
    if (current.length === 0) return;
    localActiveView = i;
    clearStyles(i);
    setZ(i);
    setOpacity(i);
    current[i].style.transform = "";
    current[i].style.filter = "";

    let currentArr = Array.from(elem.children);
    let l = 0;

    for (let j = i - 1; j >= 0; j--) {
      l--;
      currentArr[Number(j)].style.transform = `translate(${calculateX(
        ratio * l
      )}px,0px) scale(${calculateScale(ratio * l)})`;
    }
    l = 0;
    for (let k = i + 1; k < currentArr.length; k++) {
      l++;
      currentArr[Number(k)].style.transform = `translate(${calculateX(
        ratio * l
      )}px,0px) scale(${calculateScale(ratio * l)})`;
    }
  };

  const onTouchMove = function () {
    let buff = localActiveView + Math.round((lastX - newX) / ratio);
    if (buff >= 0 && elem.children.length > buff) {
      setZ(buff);
      setOpacity(buff);
      onChange(buff);
    }
    let current = elem.children[localActiveView];
    current.style.transform = `translate(${calculateX(
      newX - lastX,
      0
    )}px,0px) scale(${calculateScale(newX - lastX, 0)})`;
    setTransform(localActiveView);
  };
  const onTouchEnd = function () {
    elem.ontouchmove = null;
    elem.classList.add("gallery__anim");
    let buff = localActiveView + Math.round((lastX - newX) / ratio);
    if (buff >= 0 && elem.children.length > buff) {
      setCurrentActivePanel(buff);
      onChange(buff);
    } else {
      if (buff < 0) {
        setCurrentActivePanel(0);
        onChange(0);
      } else {
        setCurrentActivePanel(elem.children.length - 1);
        onChange(elem.children.length - 1);
      }
    }
    setTimeout(() => {
      elem.classList.remove("gallery__anim");
    }, 250);
  };

  function deleteEventListener(e) {
    elem.ontouchmove = null;
    elem.onmousemove = null;
    onTouchEnd();
    if (isMobile()) {
      window.removeEventListener("touchend", deleteEventListener);
    } else {
      window.removeEventListener("mouseup", deleteEventListener);
    }
    onMouseUp(e);
  }

  function calculateRatio() {
    const wd = window.innerWidth;

    if (wd > 1150) return 200;
    else if (wd > 1020) return 150;
    else if (wd > 820) return 130;
    else if (wd > 640) return 100;
    else if (wd > 520) return 80;
    else if (wd > 370) return 60;
    else return 50;
  }

  elem.classList.add("gallery__anim");

  ratio = calculateRatio();
  setCurrentActivePanel(0);

  window.addEventListener("resize", function () {
    ratio = calculateRatio();
    setCurrentActivePanel(localActiveView);
  });

  if (isMobile()) {
    elem.ontouchstart = function (e) {
      elem.classList.remove("gallery__anim");
      window.addEventListener("touchend", deleteEventListener, {
        passive: true,
      });
      lastX = e.touches[0].clientX;
      onMouseDown(e);
      elem.ontouchmove = function (e) {
        newX = e.touches[0].clientX;
        onTouchMove();
      };
    };
  } else {
    elem.onmousedown = function (e) {
      elem.classList.remove("gallery__anim");
      window.addEventListener("mouseup", deleteEventListener, {
        passive: true,
      });
      lastX = e.clientX;
      onMouseDown(e);
      elem.onmousemove = function (e) {
        newX = e.clientX;
        onTouchMove();
      };
    };
  }
  return {
    setActiveView: (i) => {
      if (elem.children.length <= i) return false;
      localActiveView = i;
      elem.classList.add("gallery__anim");
      setCurrentActivePanel(i);
      setTimeout(() => {
        elem.classList.remove("gallery__anim");
      }, 250);
    },
    galleryDestroy: () => {
      elem.onmousedown = null;
      elem.onmouseup = null;
      elem.ontouchstart = null;
      elem.ontouchmove = null;
      elem.ontouchend = null;
      elem.onmousemove = null;
      deleteEventListener();
    },
  };
}

export function GalleryConstrucor() {}

GalleryConstrucor.prototype.init = function (
  elem,
  onMouseDown,
  onMouseUp,
  onChange
) {
  let { setActiveView, galleryDestroy } = gallery(
    elem,
    onMouseDown,
    onMouseUp,
    onChange
  );

  this.setActiveView = setActiveView;
  this.galleryDestroy = galleryDestroy;

  return this;
};
GalleryConstrucor.prototype.destroy = function () {
  this.galleryDestroy();
  return this;
};
