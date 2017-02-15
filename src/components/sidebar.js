import React, {Component} from 'react';

export default class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp
    };
    this.setEditModal = this.setEditModal.bind(this);
  }
  setEditModal(){
    this.state.memberApp.refs.editModal.setState({
      idname: this.state.memberApp.state.idname,
      haveImg: false,
      imgURL: this.state.memberApp.state.imgURL,
      imgFile: null,
      imgFileName: null,
      inputValue: null
    },()=>{
      console.log('hey');
    });
  }
  render(){
    return(
      <div className="hidden-xs col-sm-2 column sidebar-offcanvas" id="sidebar">
          <div id="userphoto-div">
              <a id="userphoto-setting"  href="#editModal" onClick={this.setEditModal} role="button" data-toggle="modal">
                <div className="text-align-center img-hover">
                  <i className="edit-i fa fa-pencil-square-o fa-3x" aria-hidden="true"></i>
                  <img src={this.state.memberApp.state.imgURL} id="userphoto" className="img-responsive displayed" alt="" />
                </div>
              </a>
          </div>
          <div id="idname-div">
              <h3>{this.state.memberApp.state.idname}</h3>
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
