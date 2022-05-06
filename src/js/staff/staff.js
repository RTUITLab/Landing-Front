var staffSwiper = undefined;


function initStaffSwiper(){
  if(!window.Swiper)
    return;

  if (!staffSwiper) {
    new Promise((_) => {
      let staffSwiper = new Swiper('.staff__swiper', {
        spaceBetween: 0, slidesPerView: 'auto', freeMode: true, loop: true, loopFillGroupWithBlank: true, autoplay: {
          delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true,
        }, speed: 2200, mousewheel: {
          releaseOnEdges: true,
        },
      });

      globalThis.staffSwiper=staffSwiper;

      let nodes=Array.from(document.getElementById("staffSwiperParent").children)

      // Зачем?
      // Прикол в том, что свайпер утраивает количество элементов в своем контейнере
      // То есть если у нас 50 сотрудников, то будет 150 карточек (по три на сотрудника)
      // Установка inSwiperId нужна для корректного подкручивания к определенной карточке.
      for(let i in nodes){
        nodes[i].children[0].setAttribute("inSwiperId", i)
      }

      staffSwiper=true
      _();
    });
    window.removeEventListener("load",initStaffSwiper)
  }
}

window.addEventListener("load",initStaffSwiper)
