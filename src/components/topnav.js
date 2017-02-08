import React, {Component} from 'react';

export default class TopNav extends Component{
  constructor(props){
    super(props);
    this.state = {};
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        this.setState(
          {
            idname: object.idname,
            id: object._id,
            imgURL: object.imgURL
          }
        );
      }
    }
    xhttp.open("GET","/memberInfo");
    xhttp.send();
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
                <img src={this.state.imgURL} id="navbar-userphoto" className="img-responsive displayed" alt="" />
            </div>
          </div>
          <nav className="collapse navbar-collapse" role="navigation">
          <form className="navbar-form navbar-left">
              <div className="input-group input-group-sm" style={{maxWidth:360+'px'}}>
                <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term" />
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                </div>
              </div>
          </form>
          <ul className="nav navbar-nav">
            <li>
              <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Post</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right margin-right-0">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
              <ul className="dropdown-menu">
                <li><a href="">登出</a></li>
              </ul>
            </li>
          </ul>
          </nav>
      </div>
    );
  }
}
