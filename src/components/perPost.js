import React, {Component} from 'react';


class PerPost extends Component {
  constructor(props){
    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    super(props);
    this.state = {
      memberApp: this.props.memberApp,
      content: this.props.memberApp.refs.content,
      editPost: this.props.memberApp.refs.editPost,
      post: this.props.post,
      index: '',
      postcontent: this.props.post.postcontent,
      imgURL: this.props.post.imgURL,
      haveImg: false,
      isProcessing: this.props.isProcessing,
      like: this.props.post.like,
      likeLen: this.props.post.likeLen,
      iLike: this.props.post.iLike
    };
    if(this.state.imgURL){this.state.haveImg = true;}
    this.deletePost = this.deletePost.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.setEditPostModal = this.setEditPostModal.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
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
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.imgURL){
      nextState.haveImg = true;
    }else {
      nextState.haveImg = false;
    }
    try {
      var time = nextProps.post.updateTime;
      var date = new Date(JSON.parse(time));
      date = [(date.getMonth()+1).padLeft(),
                 date.getDate().padLeft(),
                 date.getFullYear()].join('/') +' ' +
                [date.getHours().padLeft(),
                 date.getMinutes().padLeft(),
                 date.getSeconds().padLeft()].join(':');
      nextProps.post.updateTime = date;
    } catch (e) {
      return true;
    }
    return true;
  }
  postProcessingShow(){
    this.setState({isProcessing: true});
  }
  postProcessingStop(){
    this.setState({isProcessing: false});
  }
  deletePost(){
    var _this = this;
    _this.postProcessingShow();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var o = JSON.parse(xhttp.responseText);
        if(o.delete_status == 1){
          _this.spliceArray();
        }
      }
    }
    xhttp.open("GET", "/del?_id=" + this.props.post._id);
    xhttp.send();
  }
  setEditPostModal(){
    this.state.editPost.setState({
      postself: this,
      _id: this.state.post._id,
      postcontent: this.state.postcontent,
      imgURL: this.state.imgURL,
      haveImg: this.state.haveImg,
      imgFile: null,
      imgFileName: null,
      inputValue: null
    });
  }
  getIndex(){
    var array = this.state.content.state.postsKey;
    var index = array.indexOf(this.props.post._id);
    this.state.index = index;
    console.log(this.state.index);
  }
  spliceArray(){
    this.state.content.state.posts.splice(this.state.index,1);
    this.state.content.state.postsKey.splice(this.state.index,1);
    this.state.content.setState({
      posts: this.state.content.state.posts,
      postsKey: this.state.content.state.postsKey
    });
  }
  likeToggle(){
    console.log(this.state.like);
    var _this = this;
    var likeList = this.state.like;
    if(this.state.iLike == true){
      var index = likeList.indexOf(this.state.memberApp.state.id);
      likeList.splice(index,1);
      this.setState({
        iLike: false,
        like: likeList,
        likeLen: this.state.likeLen - 1
      });
    }else{
      likeList.push(this.state.memberApp.state.id);
      this.setState({
        iLike: true,
        like: likeList,
        likeLen: this.state.likeLen + 1
      });
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){
      }
    }
    xhttp.open("PUT", "/like?_id=" + this.props.post._id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(likeList));

  }
  render(){
    return (
      <div className="col-md-3 col-sm-4 col-xs-12 image-element-class">
        <div className="panel panel-default">
          <div className={this.state.isProcessing ? ' processing' :' null'}></div>
          <div className={this.state.isProcessing ? ' processing-wrapper' :' null'}>
          {this.state.haveImg ? (
            <div className="panel-thumbnail">
              <img onLoad={this.state.content.callMasonry} src={ this.state.imgURL } className="img-responsive margin-center" />
            </div>
          ):(
            <div className="panel-body">
              <p >{ this.state.postcontent }</p>
            </div>
          )}
            <div className="panel-body-name">
              <div className= "row panel-body-margin-bottom">
                <div className="post-user-img">
                  <img src={ this.props.post.userid.imgURL } className="post-userimg displayed" alt="" />
                </div>
                <div className="post-user-name">
                  <p> { this.props.post.userid.idname } </p>
                </div>
                <div onClick={this.likeToggle} className={this.state.iLike ? 'post-time post-time-active' :'post-time post-time-normal'}>
                  <p> {this.state.likeLen} </p>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div className="panel-body">
            {this.state.post.isMyPost > 0 &&
              <div className="more">
                <a onClick={this.getIndex} role="button" data-toggle="dropdown">
                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={this.setEditPostModal} href="#editPostModal" role="button" data-toggle="modal">編輯</a></li>
                  <li><a onClick={this.deletePost} role="button">刪除</a></li>
                </ul>
              </div>
            }
              <p>
              {this.state.haveImg > 0 &&
                this.state.postcontent
              }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PerPost;
