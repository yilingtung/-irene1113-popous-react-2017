import React, {Component} from 'react';

export default class Sidebar extends Component{
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
      <div className="hidden-xs col-sm-2 column sidebar-offcanvas" id="sidebar">
          <div id="userphoto-div">
              <a id="userphoto-setting"  href="#editModal" role="button" data-toggle="modal">
                <div className="text-align-center img-hover">
                  <i className="edit-i fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                  <img src={this.state.imgURL} id="userphoto" className="img-responsive displayed" alt="" />
                </div>
              </a>
          </div>
          <div id="idname-div">
              <h3>{this.state.idname}</h3>
          </div>

          <ul className="nav">
          <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i className="glyphicon glyphicon-chevron-right"></i></a></li>
          </ul>

          <ul className="nav hidden-xs" id="lg-menu">
          </ul>

          <ul className="list-unstyled hidden-xs" id="sidebar-footer">
              <li>
                <div id="logo-footer-div">
                  <img src="assets/img/logo.png" id="logo-footer" className="img-responsive" />
                </div>
              </li>
              <li>
                <div>
                  <p>Copyright © Irene 2016</p>
                </div>
              </li>
          </ul>
      </div>
    );
  }
}
