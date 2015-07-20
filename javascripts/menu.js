jQuery(document).ready(function($) {
  selectCurrentMenuItem();
});


// selects the current menu item by adding the "selected" class name
// to the <a> parent node when <a>'s href matches the current URL
function selectCurrentMenuItem() {
  //strips protocol and host name from browser href
  var windowHref = window.location.href.replace(/^.*?\/\/[^\/]*/, '');
  
  $(".menu a").each(function() {
    if (windowHref == $(this).attr('href')) {
      $(this).parent().addClass('selected');
    }
  });
}