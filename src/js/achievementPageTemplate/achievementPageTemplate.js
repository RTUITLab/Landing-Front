import "../../layout/achievementPageTemplate/achievementPageTemplate.scss";

var swiper = new Swiper(".achievementsSwiperParent", {
  slidesPerView: "auto",
  spaceBetween: 15,
  pagination: {
    el: ".achievementsSwiperPagination",
    clickable: true,
  },
});
