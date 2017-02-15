import React, {Component} from 'react';
import { WindowResizeListener } from 'react-window-resize-listener'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.showSignupScreen = this.showSignupScreen.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState){
    var w = nextState.width;
    var signup_box = document.getElementById('signup-box');
    if(nextProps.indexApp.state.isSwitchBtnClick){
      if( w > 992 ){
        $(signup_box).stop().animate({left: "70%"}, 500);
      }
      else{
        $(signup_box).stop().animate({left: "30%"}, 500);
      }
    }
    return true;
  }
  submitForm(){
    document.getElementById('login_form').submit();
  }
  showSignupScreen(){
    if (!this.props.indexApp.state.isSwitchBtnClick){
      this.props.indexApp.setState({
        isSwitchBtnClick: true
      },()=>{
        console.log(this.props.indexApp.state.isSwitchBtnClick);
        var signup_box = document.getElementById('signup-box');
        var switch_btn = document.getElementById('switch-btn');
        var invisible_div = document.getElementById('invisible-div');
        invisible_div.classList.remove("display-none");
        invisible_div.className += " display-block";
        var w = window.outerWidth;
        if( w > 992 ){
          $(signup_box).animate({left: "70%"}, 500);
        }
        else{
          $(signup_box).animate({left: "30%"}, 500);
        }
      });
    }
  }
  render(){
    return(
      <div>
        <WindowResizeListener onResize={windowSize => {
          this.setState({
            height: windowSize.windowHeight,
            width: windowSize.windowWidth
          })
        }}/>
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
                      <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                    </div>
                    <div className="control-group">
                      <input name="password" type="password" className="login-field" placeholder="密碼" id="login-pass" />
                      <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                    </div>
                    <a onClick={this.submitForm} className="loginBtn" href="javascript:{}">登入</a>
                    <p id="login-err"></p>
                    <a onClick={this.showSignupScreen} id="switch-btn" className="login-link">我要註冊 <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
