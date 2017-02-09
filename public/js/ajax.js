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
