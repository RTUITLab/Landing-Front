var achievementsSwiper = undefined;


function initAchievements(){
  if(!window.Swiper)
    return;

  if (!achievementsSwiper) {
    new Promise((_) => {
      new Swiper('.achievements__swiperParent', {
        slidesPerView: 'auto', spaceBetween: 15, pagination: {
          el: '.achievements__swiperPagination', clickable: true,
        },mousewheel: {
          releaseOnEdges: true,
        },
      });
      achievementsSwiper=true
      _();
    });
    window.removeEventListener("scroll",initAchievements)
  }
}

window.addEventListener("scroll",initAchievements)
