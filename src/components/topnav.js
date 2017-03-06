import React, {Component} from 'react';

export default class TopNav extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp
    };
    this.setPostModal = this.setPostModal.bind(this);
    this.setEditModal = this.setEditModal.bind(this);
  }
  setPostModal(){
    this.state.memberApp.refs.postModal.setState({
      postcontent: '',
      imgURL: null,
      haveImg: false,
      imgFile: null,
      imgFileName: null,
      inputValue: null
    });
  }
  setEditModal(){
    this.state.memberApp.refs.editModal.setState({
      idname: this.state.memberApp.state.idname,
      haveImg: false,
      imgURL: this.state.memberApp.state.imgURL,
      imgFile: null,
      imgFileName: null,
      inputValue: null
    });
  }
  render(){
    return(
      <div className="navbar navbar-blue navbar-static-top">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="/member" className="navbar-brand logo">P</a>
          <div id="navbar-userphoto-div" className="visible-xs">
            <div className='userInfo-box'>{this.state.memberApp.state.idname}</div>
            <img src={this.state.memberApp.state.imgURL} id="navbar-userphoto" className="img-responsive displayed" alt="" />
          </div>
        </div>
        <nav className="collapse navbar-collapse" role="navigation">
          <div className="hide-xs">
            <form action="" method="get">
                <input type="text" name="search_text" id="search_text" placeholder="Search"/>
                <i className="fa fa-search" type="button" name="search_button" id="search_button"></i>
            </form>
          </div>
          <ul className="nav navbar-nav">
          {this.state.memberApp.state.login >0 &&
            <li className="text-align-center">
              <a href="#postModal" onClick={this.setPostModal} role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Post</a>
            </li>
          }
          {this.state.memberApp.state.login >0 &&
            <li className="text-align-center visible-xs">
              <a href="#editModal" onClick={this.setEditModal} role="button" data-toggle="modal">編輯</a>
            </li>
          }
            <li className="text-align-center visible-xs">
              <a href="">{this.state.memberApp.state.login ? "登出": "登入"}</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right margin-right-0 hide-xs">
              {this.state.memberApp.state.login ?(
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
                  <ul className="dropdown-menu userInfo">
                    <li>
                      <div className="shadow">
                          <img src={this.state.memberApp.state.imgURL} className="img-responsive displayed" alt="" />
                      </div>
                      <h4>{this.state.memberApp.state.idname}</h4>
                    </li>
                    <a id="userphoto-setting"  href="#editModal" onClick={this.setEditModal} role="button" data-toggle="modal">編輯</a>
                    <a href="">登出</a>
                  </ul>
                </li>

              ):(
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
                  <ul className="login-menu userInfo">
                    <img src={this.state.memberApp.state.imgURL} className="img-responsive displayed" alt="" />
                    <h5>早安</h5>
                    <h4>{this.state.memberApp.state.idname}</h4>
                    <a href="">Login</a>
                  </ul>
                </li>
              )}
          </ul>
          {this.state.memberApp.state.login >0 &&
            <div className='hello-box hide-xs'>
              早安
            </div>
          }
        </nav>
      </div>
    );
  }
}
