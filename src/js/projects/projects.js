import gallery from "../gallery/gallery";
import projectsData from "../data/projectsData";

let currentActiveTab = 0;

let { setActiveView } = gallery(
  document.getElementById("GalleryParent"),
  onMouseDown,
  onMouseUp,
  onChange
);

const statusBar = document.getElementById("projectsStatusBar");
const projectsInfo = document.getElementById("projectInfoContent");
const galleryParent = document.getElementById("GalleryParent");
const currentProjectTitle = document.getElementById("currentProjectTitle");

function onMouseDown(e) {
  projectsInfo.classList.add("projects__hide");
}
function onMouseUp(e) {
  updateProjectsInfo();
}
function updateProjectsInfo() {
  projectsInfo.classList.remove("projects__hide");
  currentProjectTitle.innerText = projectsData[currentActiveTab].title;
}

function onChange(e) {
  setActiveStatusBarPoint(e);
}

function setActiveStatusBarPoint(e) {
  statusBar.children[currentActiveTab].setAttribute("active", "false");
  statusBar.children[e].setAttribute("active", "true");
  currentActiveTab = e;
}

for (let i in Array.from(statusBar.children)) {
  statusBar.children[i].onclick = () => {
    setActiveView(i);
    setActiveStatusBarPoint(i);
    updateProjectsInfo();
  };
}

setActiveStatusBarPoint(Math.round(projectsData.length / 2));
setActiveView(Math.round(projectsData.length / 2));
updateProjectsInfo();
