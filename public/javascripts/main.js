window.addEventListener('scroll', function(e){
    var scrolled = window.pageYOffset;
    var parallax = document.querySelector(".parallax");
    // You can adjust the 0.4 to change the speed
      var coords = (scrolled * 0.8) + 'px'
    parallax.style.transform = 'translateY(' + coords + ')';
  });
  