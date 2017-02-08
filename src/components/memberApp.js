import React, {Component} from 'react';
import Sidebar from './sidebar';
import TopNav from './topnav';
import Content from './content';
import Edit from './edit';
import Post from './post';
import EditPost from './editPost';

export default class MemberApp extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.reBuildEdit = this.reBuildEdit.bind(this);
    this.reBuildPost = this.reBuildPost.bind(this);
    this.reBuildEditPost = this.reBuildEditPost.bind(this);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        this.setState(
          {
            idname: object.idname,
            id: object._id,
            imgURL: object.imgURL,
            edit: <Edit memberApp={this}/>,
            post: <Post memberApp={this}/>,
            editPost: null
          }
        );
      }
    }
    xhttp.open("GET","/memberInfo");
    xhttp.send();
  }
  postPreprocess(type,post,index){
    this.refs.content.addTempPost(type,post,index);
  }
  refreshContent(){
    this.refs.content.refresh();
  }
  reBuildEdit(){
    this.setState({edit: null},()=>{
      this.setState({edit:<Edit memberApp={this}/>});
    });
  }
  reBuildPost(){
    this.setState({post: null},()=>{
      this.setState({post:<Post memberApp={this}/>});
    });
  }
  reBuildEditPost(){
    this.setState({editPost: null},()=>{
      this.setState({editPost: <EditPost memberApp={this}/>});
    });
  }
  removeEditPost(){
    this.setState({editPost: null});
  }
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
                  <Content ref="content" userId={this.state.id} memberApp={this}/>
              </div>
            </div>
          </div>
        </div>
        {this.state.edit}
        {this.state.post}
        {this.state.editPost}
      </div>
    );
  }
}
