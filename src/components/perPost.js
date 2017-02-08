import React, {Component} from 'react';


class PerPost extends Component {
  constructor(props){
    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    super(props);
    this.state = {};
    this.deletePost = this.deletePost.bind(this);
    this.passPostInfo = this.passPostInfo.bind(this);
    var time = this.props.post.updateTime;
    var date = new Date(JSON.parse(time));
    date = [(date.getMonth()+1).padLeft(),
               date.getDate().padLeft(),
               date.getFullYear()].join('/') +' ' +
              [date.getHours().padLeft(),
               date.getMinutes().padLeft(),
               date.getSeconds().padLeft()].join(':');
    this.props.post.updateTime = date;
  }
  componentWillMount(){
    var haveImg = Boolean(this.props.post.imgURL);
    this.setState({
      haveImg: haveImg,
      memberApp: this.props.memberApp
    });
  }
  shouldComponentUpdate(nextProps,nextState){
    var time = nextProps.post.updateTime;
    var date = new Date(JSON.parse(time));
    date = [(date.getMonth()+1).padLeft(),
               date.getDate().padLeft(),
               date.getFullYear()].join('/') +' ' +
              [date.getHours().padLeft(),
               date.getMinutes().padLeft(),
               date.getSeconds().padLeft()].join(':');
    nextProps.post.updateTime = date;
    return true;
  }
  deletePost(){
    console.log(this.props.post._id);
    var _this = this;
    this.state.memberApp.setState({
      perPostId: this.props.post._id,
      perPostIndex: this.props.index
    },()=>{
      this.state.memberApp.postPreprocess("previous",this.props.post,this.props.index);
    });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){
        console.log('delete');
        var o = JSON.parse(xhttp.responseText);
        console.log(o);
        if(o.delete_status == 1){
          console.log(o.delete_message);
          _this.state.memberApp.refreshContent();
        }else{
          console.log('delete error');
        }
      }
    }
    var post = {
      _id: this.props.post._id.toString()
    };
    xhttp.open("GET", "/del?_id=" + post._id);
    xhttp.send();
  }
  passPostInfo(){
    this.state.memberApp.setState({
      perPostId: this.props.post._id,
      perPostIndex: this.props.index
    },()=>{
      this.state.memberApp.reBuildEditPost();
    });
  }
  render(){
    return (
      <div className="col-sm-4 col-xs-12 image-element-class">
        <div className="panel panel-default">
        {this.state.haveImg ? (
          <div className="panel-thumbnail">
            <img src={ this.props.post.imgURL } className="img-responsive margin-center" />
          </div>
        ):(
          <div className="panel-body">
            <p >{ this.props.post.postcontent }</p>
          </div>
        )}
          <div className="panel-body-name">
            <div className= "row panel-body-margin-bottom">
              <div>
                <img src={ this.props.post.userid.imgURL } className="post-userimg displayed" alt="" />
              </div>
              <div className="post-user-name">
                <p> { this.props.post.userid.idname } </p>
              </div>
              <div className="post-time">
                <p> { this.props.post.updateTime }</p>
              </div>
            </div>
          </div>
          <div className="panel-body">
          {this.props.isMyPost > 0 &&
            <div className="more">
              <a role="button" data-toggle="dropdown">
                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a onClick={this.passPostInfo} href="#editPostModal" role="button" data-toggle="modal">編輯</a></li>
                <li><a onClick={this.deletePost} role="button">刪除</a></li>
              </ul>
            </div>
          }
            <p>
            {this.state.haveImg > 0 &&
              this.props.post.postcontent
            }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PerPost;
