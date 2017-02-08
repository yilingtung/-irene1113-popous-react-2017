
$(document).ready(function(){/* off-canvas sidebar toggle */

$('[data-toggle=offcanvas]').click(function() {
  	$(this).toggleClass('visible-xs text-center');
    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    $('.row-offcanvas').toggleClass('active');
    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
    $('#btnShow').toggle();
});

});

var $grid = $('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 0
});

var grid;
function resize(){
  var w = window.outerWidth;
  var $grid = $('.my-gallery-class').masonry({
    // options
    itemSelector: '.image-element-class',
    columnWidth: 0
  });
  if( w < 768 ){
    grid = document.getElementsByClassName("image-element-class");
    $(grid).removeClass("image-element-class");
    setTimeout(function(){
      $grid.masonry('layout');
    } ,1000);

  }
}
