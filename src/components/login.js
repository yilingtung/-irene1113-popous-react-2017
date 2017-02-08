import React, {Component} from 'react';

export default class Login extends Component {
  submitForm(){
    document.getElementById('login_form').submit();
  }
  render(){
    return(
      <div>
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <div className="col-md-1">
          </div>
          <div className="col-md-10">
            <div className="login-screen">
              <div className="app-title">
                <h1>Login</h1>
              </div>
              <form id="login_form" method="post" action="/login">
                  <div className="login-form">
                    <div className="control-group">
                      <input name="username" type="text" className="login-field" placeholder="帳號" id="login-name" />
                      <label className="login-field-icon fui-user" for="login-name"></label>
                    </div>
                    <div className="control-group">
                      <input name="password" type="password" className="login-field" placeholder="密碼" id="login-pass" />
                      <label className="login-field-icon fui-lock" for="login-pass"></label>
                    </div>
                    <a onClick={this.submitForm} className="loginBtn" href="javascript:{}">登入</a>
                    <p id="login-err"></p>
                    <a id="switch-btn" className="login-link" href="#">我要註冊 <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
