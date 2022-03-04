window.addEventListener("scroll", scrollFunction, { passive: true });

function scrollFunction() {
  let obj = document.getElementById("header");
  if (window.scrollY > 50) {
    obj.setAttribute("scroll", "true");
  } else {
    obj.setAttribute("scroll", "false");
  }
}
