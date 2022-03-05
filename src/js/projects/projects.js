import gallery from "../gallery/gallery";
import projectsData from "../data/projectsData";

let currentActiveTab = 0;

let { setActiveView, galleryDestroy } = gallery(
  document.getElementById("GalleryParent"),
  onMouseDown,
  onMouseUp,
  onChange
);

const statusBar = document.getElementById("projectsStatusBar");
const projectsInfo = document.getElementById("projectInfoContent");
const galleryParent = document.getElementById("GalleryParent");
const currentProjectTitle = document.getElementById("currentProjectTitle");
let displayedProjects = projectsData;

function onMouseDown(e) {
  projectsInfo.classList.add("projects__hide");
}

function onMouseUp(e) {
  updateProjectsInfo();
}

function updateProjectsInfo() {
  if (displayedProjects.length === 0) return;
  projectsInfo.classList.remove("projects__hide");
  currentProjectTitle.innerText = displayedProjects[currentActiveTab].title;
}

function onChange(e) {
  setActiveStatusBarPoint(e);
}

function setActiveStatusBarPoint(e) {
  if (Array.from(statusBar.children).length === 0) return;
  statusBar.children[currentActiveTab].setAttribute("active", "false");
  statusBar.children[e].setAttribute("active", "true");
  currentActiveTab = e;
}

const generateProjects = (e) => {
  galleryDestroy();
  let projects = projectsData;
  if (e !== "all") {
    projects = projectsData.filter((k) => {
      return k.tags.indexOf(e) !== -1 || k.tech.indexOf(e) !== -1;
    });
  }

  galleryParent.innerHTML = "";

  if (projects.length === 0) {
    currentActiveTab = 0;
    generateStatusBar(0);
    galleryParent.append("Тут пусто :(");
    currentProjectTitle.innerHTML = "";
  } else {
    projects.forEach((e) => {
      let newChild = document.createElement("div");
      newChild.className = "gallery__galleryItem noselect";
      let newImg = document.createElement("img", {
        draggable: "false",
        src: e.images[0],
      });
      newImg.draggable = "false";
      newImg.src = e.images[0];
      newChild.appendChild(newImg);
      galleryParent.appendChild(newChild);
    });
    displayedProjects = projects;
    generateStatusBar(projects.length);
    currentActiveTab = Math.floor(projects.length / 2);
    setActiveStatusBarPoint(currentActiveTab);

    let newGallery = gallery(
      document.getElementById("GalleryParent"),
      onMouseDown,
      onMouseUp,
      onChange
    );
    newGallery.setActiveView(currentActiveTab);
    updateProjectsInfo();

    setActiveView = newGallery.setActiveView;
    galleryDestroy = newGallery.galleryDestroy;
  }
};

window.generateProjects = generateProjects;

function generateStatusBar(count) {
  statusBar.innerHTML = "";
  for (let i = 0; i < count; i++)
    statusBar.appendChild(document.createElement("div"));
}

for (let i in Array.from(statusBar.children)) {
  statusBar.children[i].onclick = () => {
    setActiveView(i);
    setActiveStatusBarPoint(i);
    updateProjectsInfo();
  };
}

setActiveStatusBarPoint(Math.floor(projectsData.length / 2));
setActiveView(Math.floor(projectsData.length / 2));
updateProjectsInfo();
document.getElementById("projects__tags__all").checked = true;
