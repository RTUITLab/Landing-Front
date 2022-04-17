let parallaxInstance;

let enabled = window.innerWidth < 1000;

window.addEventListener('resize', setParallax.bind(this));

function setParallax() {
  if (window.innerWidth < 1000 && enabled) {
    if (parallaxInstance) parallaxInstance.destroy();
    enabled = false;
  } else if (!enabled) {

    if (!window.Parallax) {
      var js = document.createElement('script');
      js.src = process.env.PARALLAX_LINK;
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(js);
      js.onload = function() {
        parallaxInstance = new Parallax(document.getElementById('scene'));
        enabled = true;
      };
    } else {
      parallaxInstance = new Parallax(document.getElementById('scene'));
      enabled = true;
    }


  }
}

new Promise((_) => {
  setParallax();
  _();
});
