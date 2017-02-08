import React, {Component} from 'react';
import Sidebar from './sidebar';
import TopNav from './topnav';
import Oops from './oops';
import Edit from './edit';
import Post from './post';

export default class OthersApp extends Component {
  render(){
    return(
      <div>
        <link href="assets/css/styles_member.css" rel="stylesheet" />
        <div className="wrapper">
          <div className="box">
            <div className="row row-offcanvas row-offcanvas-left">
              <Sidebar />
              <div className="column col-sm-10 col-xs-12" id="main">
                  <TopNav />
                  <Oops />
              </div>
            </div>
          </div>
        </div>
        <Edit />
        <Post />
      </div>
    );
  }
}
