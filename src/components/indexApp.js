import React, {Component} from 'react';

import SignUp from './signup';
import Login from './login';

export default class App extends Component {
  render() {
    return(
      <div>
        <link rel="stylesheet" href="assets/css/style.css" />
        <SignUp />
        <div className="login-logo" >
            <img className="img-fix-size" src="assets/img/logo.png"/>
        </div>
        <Login />
      </div>
    );
  }
}
