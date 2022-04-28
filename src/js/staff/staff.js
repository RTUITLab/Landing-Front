var staffSwiper = undefined;


function initStaffSwiper(){
  if(!window.Swiper)
    return;

  if (!staffSwiper) {
    new Promise((_) => {
      new Swiper('.staff__swiper', {
        spaceBetween: 10, slidesPerView: 'auto', freeMode: true, loop: true, loopFillGroupWithBlank: true, autoplay: {
          delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true,
        }, speed: 2200, mousewheel: {
          releaseOnEdges: true,
        },
      });
      staffSwiper=true
      _();
    });
    window.removeEventListener("load",initStaffSwiper)
  }
}

window.addEventListener("load",initStaffSwiper)
