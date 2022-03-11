let parallaxInstance;

let enabled = window.innerWidth < 1000;

window.addEventListener("resize", setParallax);
function setParallax() {
  if (window.innerWidth < 1000 && enabled) {
    if (parallaxInstance) parallaxInstance.destroy();
    enabled = false;
  } else if (!enabled) {
    parallaxInstance = new Parallax(document.getElementById("scene"));
    enabled = true;
  }
}

setParallax();
