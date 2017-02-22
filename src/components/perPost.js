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
      detail: this.props.memberApp.refs.detailModal,
      post: this.props.post,
      index: '',
      postcontent: this.props.post.postcontent,
      imgURL: this.props.post.imgURL,
      haveImg: false,
      isProcessing: this.props.isProcessing,
      likeLen: this.props.post.likeLen,
      replyLen: this.props.post.replyLen,
      iLike: this.props.post.iLike,
      mouseEnter: false,
      test: true
    };
    if(this.state.imgURL){this.state.haveImg = true;}
    this.deletePost = this.deletePost.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.setEditPostModal = this.setEditPostModal.bind(this);
    this.setDetailModal = this.setDetailModal.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    var time = this.props.post.updateTime;
    var date = new Date(JSON.parse(time));
    date = [date.getFullYear().padLeft(),
            (date.getMonth()+1).padLeft(),
            date.getDate()].join('.') +' ' +
            [date.getHours().padLeft(),
            date.getMinutes().padLeft()].join(':');
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
      date = [date.getFullYear().padLeft(),
              (date.getMonth()+1).padLeft(),
              date.getDate()].join('.') +' ' +
              [date.getHours().padLeft(),
              date.getMinutes().padLeft()].join(':');
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
    _this.getIndex();
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
  setDetailModal(){
    console.log('detail open');
    this.state.detail.setState({
      postUserImg: this.state.post.userid.imgURL,
      postUserName: this.state.post.userid.idname,
      post_id: this.state.post._id,
      post_this: this,
      postcontent: this.state.postcontent,
      updateTime: this.props.post.updateTime,
      imgURL: this.state.imgURL,
      haveImg: this.state.haveImg,
      index: this.state.index,
      likeLen: this.state.likeLen,
      replyLen: this.state.replyLen,
      iLike: this.state.iLike,
      isCommentsShow: false,
      replyContent: ""
    },()=>{
      this.state.detail.getReplyInfo();
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

  likeToggle(e){
    e.stopPropagation();
    if(this.state.iLike){
      this.setState({
        test:false,
        iLike: false,
        likeLen: this.state.likeLen - 1
      });
    }else{
      this.setState({
        test:false,
        iLike: true,
        likeLen: this.state.likeLen + 1
      });
    }
    var _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){
        _this.setState({
          test:true
        });
      }
    }
    xhttp.open("PUT", "/post?type=like&_id=" + this.props.post._id);
    xhttp.send();
  }
  mouseEnter(){
    this.setState({
      mouseEnter: true
    });
  }
  mouseLeave(){
    this.setState({
      mouseEnter: false
    });
  }
  render(){
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="perPost col-md-3 col-sm-4 col-xs-12 image-element-class">
        <div className="panel panel-default">
        {this.state.post.isMyPost > 0 &&
          (this.state.mouseEnter > 0 &&
            <div>
              <div onClick={this.deletePost} className="action-btn perPost-action-btn action-del">
                <i className="fa fa-trash-o"></i>
              </div>
              <div onClick={this.setEditPostModal} href="#editPostModal" data-toggle="modal" className="action-btn perPost-action-btn action-edit">
                <i className="fa fa-pencil"></i>
              </div>
            </div>
          )
        }
          <div className={this.state.isProcessing ? 'processing' :'null'}></div>
          <div className={this.state.isProcessing ? 'processing-wrapper' :'null'}>
            <div className="perPost-wrapper cursor-zoom-in" onClick={this.setDetailModal} href="#detailModal" data-toggle={this.state.test ? 'modal' :''} >
              <div className="panel-body">
              {this.state.haveImg ? (
                <img onLoad={this.state.content.callMasonry} src={ this.state.imgURL } className="img-responsive margin-center" />
              ):(
                <p >{ this.state.postcontent }</p>
              )}
              </div>
              <div className="panel-body-name">
                <div className= "row panel-body-margin-bottom">
                  <div className="post-user-img">
                    <img src={ this.props.post.userid.imgURL } className="post-userimg displayed" alt="" />
                  </div>
                  <div className="post-user-name">
                    <p> { this.props.post.userid.idname } </p>
                  </div>
                  <div onClick={this.likeToggle} className={this.state.iLike ? 'post-likes post-likes-active' :'post-likes post-likes-normal'}>
                    <p> {this.state.likeLen} </p>
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </div>
                  <div className="post-comments post-comments-normal">
                    <p> {this.state.replyLen} </p>
                    <i className="fa fa-comment" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-body-content">
                {this.state.haveImg > 0 &&
                  <p>{this.state.postcontent}</p>
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PerPost;
