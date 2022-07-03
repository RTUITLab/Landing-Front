var achievementsSwiper = undefined;


function initAchievements() {
  if (!window.Swiper) return;

  if (!achievementsSwiper) {
    if(window.innerWidth<1600){
      let arr = Array.from(document.getElementsByClassName("hidden-slide"))
      arr.forEach((e)=>{
        e.style.display="none"
      })
    }
    new Promise((_) => {
      new Swiper('.achievements__swiperParent', {
        centeredSlides:window.innerWidth<1600,
        slidesPerView: 'auto', spaceBetween: 15, pagination: {
          el: '.achievements__swiperPagination', clickable: true,
        }, mousewheel: {
          releaseOnEdges: true,
        },
      });
      achievementsSwiper = true;
      _();
    });

    window.removeEventListener('load', initAchievements);
  }
}

window.addEventListener("load",initAchievements)
