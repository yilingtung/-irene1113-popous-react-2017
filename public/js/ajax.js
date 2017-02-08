$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

// Error message
var error = $.getUrlVar('login_error');
if(error == '1'){
  document.getElementById('login-err').innerHTML = "帳號或密碼可能打錯了";
  history.pushState({}, null, window.location.href.split('?')[0]);
}

//

// Signup User Active
var signup_active = function(){

  var newUser = {
        'idname': $('input#signup-id').val(),
        'username': $('input#signup-name').val(),
        'password': $('input#signup-pass').val(),
        'imgname': (Math.floor((Math.random() * 10) + 1)).toString(),
        'imgContentData': "null",
        'imgContentType': "image/png"
      };

  $.ajax({
        type: 'POST',
        data: newUser,
        url: '/signup',
        dataType: 'JSON',
        success: function(data, textStatus) {
          console.log(000);
        if(data.signup_status == 0){
            //Failed
            $("#signup-err")[0].innerHTML = data.response;
            $('input#signup-id')[0].value = "";
            $('input#signup-name')[0].value = "";
            $('input#signup-pass')[0].value = "";
        }
        else if(data.signup_status == 1){
            //success
            window.location.href = data.response;
        }
      },
        error: function(res,err){
          console.log(err);
        }
    });
}
//removeImg post
// var control = $("#img-input"),
//     clearBn = $("#delete-btn");
// clearBn.on("click", function(){
//     //control.replaceWith( control.val('').clone( true ) );
//     control[0].value = "";
//     $("#post-img-div").addClass("display-none");
//     $("#post-img-div").removeClass("img-div-style");
//     $("#post-img-name")[0].innerHTML = "請選擇一張照片";
//
// });
//removeImg editPost
var control = $("#editPost_img-input"),
    clearBn = $("#editPost_delete-btn");
clearBn.on("click", function(){
    //control.replaceWith( control.val('').clone( true ) );
    control[0].value = "";
    $("#editPost_post-img-div").addClass("display-none");
    $("#editPost_post-img-div").removeClass("img-div-style");
    $("#editPost_post-img-name")[0].innerHTML = "請選擇一張照片";

});
