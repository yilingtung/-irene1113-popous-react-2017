import React, {Component} from 'react';

import SignUp from './signup';
import Login from './login';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {isSwitchBtnClick: false};
  }
  render() {
    return(
      <div>
        <link rel="stylesheet" href="assets/css/style.css" />
        <SignUp indexApp = {this}/>
        <div className="login-logo" >
            <img className="img-fix-size" src="assets/img/logo.png"/>
        </div>
        <Login indexApp = {this}/>
      </div>
    );
  }
}
