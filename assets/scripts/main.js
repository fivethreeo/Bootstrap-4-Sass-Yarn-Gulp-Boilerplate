//your JS here

$(function () {
  var lastScrollTop = 0;
  var $navbar = $('.navbar');

  $(window).scroll(function(event){
    var st = $(this).scrollTop();

    if (st > lastScrollTop) { // scroll down
      
      // use this is jQuery full is used
      $navbar.addClass('fade-in')
      
      // use this to use CSS3 animation
      // $navbar.addClass("fade-out");
      // $navbar.removeClass("fade-in");
      
      // use this if no effect is required
      // $navbar.hide();
    } else if (st==0) { // scroll up
      
      // use this is jQuery full is used
      $navbar.removeClass('fade-in')
      
      // use this to use CSS3 animation
      // $navbar.addClass("fade-in");
      // $navbar.removeClass("fade-out");
      
      // use this if no effect is required
      // $navbar.show();
    }
    lastScrollTop = st;
  });
});

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '.navbar',
    offset: 54
  });

})(jQuery); // End of use strict

var els = document.querySelectorAll('.reveal p, .reveal h1, .reveal h2, .reveal h4, .reveal h5, .reveal h6, .reveal ul'), i;

for (i = 0; i < els.length; ++i) {
  sr.reveal(els[i], { reset: true, duration: 2000, mobile: false, distance: '20px',}, 50);;
}
