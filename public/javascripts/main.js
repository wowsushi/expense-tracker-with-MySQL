window.addEventListener('scroll', e => {
    var scrolled = window.pageYOffset;
    var parallax = document.querySelector(".parallax");
    var coords = (scrolled * 0.8) + 'px'
    parallax.style.transform = 'translateY(' + coords + ')';
});

AOS.init();

