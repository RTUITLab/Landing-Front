window.addEventListener('scroll', scrollFunction, { passive: true });
const children = Array.from(document.getElementById('pageContentParent').children);
const headersChildren = Array.from(document.getElementById('headerElements').children);
let lastActive = 0;
const obj = document.getElementById('header');

var staffSwiper = undefined;
var achievementsSwiper = undefined;
var equipmentHidden = false;

function setScrollStatus(obj) {
  if (window.scrollY > 50) {
    obj.setAttribute('scroll', 'true');
  } else {
    obj.setAttribute('scroll', 'false');
  }
}

function findActiveTab(activeTab) {
  for (let i = 0; i < children.length; i++) {
    if (window.scrollY + (window.innerHeight / 4) * 3 >= children[i].offsetTop) {
      activeTab = i;
    }
  }
  return activeTab;
}

function initSwiper() {
  if (!staffSwiper) {
    new Promise((_) => {
      staffSwiper = new Swiper('.staff__swiper', {
        spaceBetween: 10, slidesPerView: 'auto', freeMode: true, loop: true, loopFillGroupWithBlank: true, autoplay: {
          delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true,
        }, speed: 2200,
      });
      _();
    });
  }
  if (!achievementsSwiper) {
    new Promise((_) => {
      achievementsSwiper = new Swiper('.achievements__swiperParent', {
        slidesPerView: 'auto', spaceBetween: 15, pagination: {
          el: '.achievements__swiperPagination', clickable: true,
        },
      });
      _();
    });
  }
}

function hideEquipment() {
  if (!equipmentHidden) {
    new Promise((_) => {
      let elems = Array.from(document.getElementsByClassName('equipment__content')[0].children);

      for (let i = 2; i < elems.length; i++) {
        elems[i].setAttribute('hidden', 'true');
      }
      _();
    });
    equipmentHidden = true;
  }
}

function scrollFunction() {

  initSwiper();
  hideEquipment();

  setScrollStatus(obj);
  let activeTab = lastActive;
  activeTab = findActiveTab(activeTab);
  if (activeTab !== lastActive) {
    setTab(activeTab);
  }
}

function setTab(activeTab) {
  headersChildren[lastActive].setAttribute('active', 'false');
  headersChildren[activeTab].setAttribute('active', 'true');
  lastActive = activeTab;
}

new Promise((_) => {
  setScrollStatus(obj);
  setTab(findActiveTab(lastActive));
  _();
});