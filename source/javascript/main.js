(function() {
  // Toggle main nav
  var $navBar = $('nav.nav-main');

  $('a.toggle-nav').on('click', function(e) {
    e.preventDefault();
    $navBar.slideToggle(200);
    $(this).toggleClass('active');
  })
})();
