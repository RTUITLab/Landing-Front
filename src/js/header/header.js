window.addEventListener("scroll", scrollFunction, { passive: true });
const children = Array.from(
  document.getElementById("pageContentParent").children
);
const headersChildren = Array.from(
  document.getElementById("headerElements").children
);
let lastActive = 0;

function scrollFunction() {
  let obj = document.getElementById("header");
  if (window.scrollY > 50) {
    obj.setAttribute("scroll", "true");
  } else {
    obj.setAttribute("scroll", "false");
  }
  let activeTab = lastActive;
  for (let i = 0; i < children.length; i++) {
    if (
      window.scrollY + (window.innerHeight / 4) * 3 >=
      children[i].offsetTop
    ) {
      activeTab = i;
    }
  }
  if (activeTab !== lastActive) {
    setTab(activeTab);
  }
}
function setTab(activeTab) {
  headersChildren[lastActive].setAttribute("active", "false");
  headersChildren[activeTab].setAttribute("active", "true");
  lastActive = activeTab;
}
setTab(lastActive);
