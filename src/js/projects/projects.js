import projectsData from '../data/projectsData';
import { GalleryConstrucor } from '../gallery/gallery';

let initProjects = false;

let currentActiveTab = 0;

const statusBar = document.getElementById('projectsStatusBar');
const projectsInfo = document.getElementById('projectInfoContent');
const galleryParent = document.getElementById('GalleryParent');
const currentProjectTitle = document.getElementById('currentProjectTitle');
const currentProjectLink = document.getElementById('currentProjectLink');
let displayedProjects = projectsData;

/**
 * !!! Attention !!!
 * Здесь var -- нужен. Для видимости абсолютно везде.
 * @type {null}
 */
var gallery = null;

function onMouseDown(e) {
  projectsInfo.classList.add('projects__hide');
}

function onClick() {
  window.location.href = currentProjectLink;
}

function onMouseUp(e) {
  updateProjectsInfo();
  projectsInfo.classList.remove('projects__hide');
}

function updateProjectsInfo() {
  if (displayedProjects.length === 0) return;
  currentProjectTitle.innerText = displayedProjects[currentActiveTab].title;
  currentProjectLink.href = 'projects/' + displayedProjects[currentActiveTab].link;
  currentProjectLink.style.display = 'block';
}

function onChange(e) {
  setActiveStatusBarPoint(e);
  updateProjectsInfo();
}

function setActiveStatusBarPoint(e) {
  if (Array.from(statusBar.children).length === 0) return;
  statusBar.children[currentActiveTab].setAttribute('active', 'false');
  statusBar.children[e].setAttribute('active', 'true');
  currentActiveTab = e;
}

function generateProjects(e) {
  gallery.destroy();
  let projects = projectsData;
  if (e !== 'all') {
    projects = projectsData.filter((k) => {
      return k.tags.indexOf(e) !== -1 || k.tech.indexOf(e) !== -1;
    });
  }

  galleryParent.innerHTML = '';

  if (projects.length === 0) {
    currentActiveTab = 0;
    generateStatusBar(0);
    galleryParent.append('Тут пусто :(');
    currentProjectTitle.innerHTML = '';
    currentProjectLink.style.display = 'none';
  } else {
    projects.forEach((e) => {
      let newChild = document.createElement('div');
      newChild.className = 'gallery__galleryItem noselect';
      let newImg = document.createElement('img', {
        draggable: 'false', src: '.' + e.images[0],
      });
      newImg.draggable = 'false';
      newImg.src = '.' + e.images[0];
      newChild.appendChild(newImg);
      galleryParent.appendChild(newChild);
    });
    displayedProjects = projects;
    generateStatusBar(projects.length);
    currentActiveTab = Math.floor(projects.length / 2);
    setActiveStatusBarPoint(currentActiveTab);

    gallery.init(document.getElementById('GalleryParent'), onMouseDown, onMouseUp, onChange, onClick);
    gallery.setActiveView(currentActiveTab);
    updateProjectsInfo();

    globalThis.gallery.next = gallery.next;
    globalThis.gallery.back = gallery.back;
  }
  setPointsAction();
}

window.generateProjects = generateProjects.bind(this);

function generateStatusBar(count) {
  statusBar.innerHTML = '';
  for (let i = 0; i < count; i++) statusBar.appendChild(document.createElement('div'));
}

function setPointsAction() {
  for (let i in Array.from(statusBar.children)) {
    statusBar.children[i].onclick = () => {
      gallery.setActiveView(i);
      setActiveStatusBarPoint(i);
      updateProjectsInfo();
    };
  }
}

function onLoad(_) {
  if (initProjects) {
    return false;
  }
  initProjects=true
  window.removeEventListener('scroll', onLoad);

  setPointsAction.call(this);
  gallery = new GalleryConstrucor().init(document.getElementById('GalleryParent'), onMouseDown, onMouseUp, onChange, onClick);
  setActiveStatusBarPoint.call(this, Math.floor(projectsData.length / 2));
  gallery.setActiveView.call(this, Math.floor(projectsData.length / 2));
  updateProjectsInfo.call(this);
  document.getElementById('projects__tags__all').checked = true;
  _();

  globalThis.gallery = {};
  globalThis.gallery.next = gallery.next;
  globalThis.gallery.back = gallery.back;
}

window.addEventListener('scroll', onLoad);

