$(function() {
  // OPACITY OF BUTTON SET TO 0%
  $(".roll").css("opacity","0");
  // ON MOUSE OVER
  $(".roll").hover(function () {
    // SET OPACITY TO 30%
    $(this).stop().animate({opacity: .3}, "slow");
  },
  // ON MOUSE OUT
  function () {
    // SET OPACITY BACK TO 50%
    $(this).stop().animate({opacity: 0}, "slow");
  });
});
