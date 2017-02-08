var isSwitchBtnClick = false;
var signup_box = document.getElementById('signup-box');
var switch_btn = document.getElementById('switch-btn');
var invisible_div = document.getElementById('invisible-div');

document.getElementById('switch-btn').onclick = function(){
  if (!isSwitchBtnClick){
    isSwitchBtnClick = true;
    invisible_div.classList.remove("display-none");
    invisible_div.className += " display-block";
    var w = window.outerWidth;
    if( w > 992 ){
      $(signup_box).animate({left: "70%"}, 500);
      $(switch_btn).animate({right: "75%"}, 500);
    }
    else{
      $(signup_box).animate({left: "30%"}, 500);
      $(switch_btn).animate({right: "35%"}, 500);
    }
  }
}

document.getElementById('invisible-div').onclick = function(){
  isSwitchBtnClick = false;
  invisible_div.classList.remove("display-block");
  invisible_div.className += " display-none";
  $(signup_box).animate({left: "100%"}, 500);
}


function resize(){
  var w = window.outerWidth;
  if(isSwitchBtnClick){
    if( w > 992 ){
      $(signup_box).stop().animate({left: "70%"}, 500);
      $(switch_btn).stop().animate({right: "75%"}, 500);
    }
    else{
      $(signup_box).stop().animate({left: "30%"}, 500);
      $(switch_btn).stop().animate({right: "35%"}, 500);
    }
  }
}
