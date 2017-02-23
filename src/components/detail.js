import React, {Component} from 'react';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'popousUserImg';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxwnkzsxe/image/upload';

export default class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp,
      replys:''
    };
    this.toggleComment = this.toggleComment.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  toggleComment(){
    var isCommentsShow = !this.state.isCommentsShow;
    this.setState({
      isCommentsShow: isCommentsShow
    });
  }
  getReplyInfo(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var resObject = JSON.parse(xhttp.responseText);
        var object = resObject.reply.map((value) => {
          console.log(value);
          return (
            <li key={value._id}>
              <div className="row">
                <div className="comment">
                  <hr></hr>
                  <img src={value.userid.imgURL} className="post-userimg displayed" alt="" />
                  <div>
                    <span>{value.userid.idname}</span>
                    <p>{value.replyContent}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        });
        this.setState({replys:object});
      }
    }
    xhttp.open("GET","/post?find=reply&_id=" + this.state.post_id);
    xhttp.send();
  }
  submitForm(){
    var _this = this;
    var d = new Date();
    this.setState({
      replyUpdateTime: d.getTime().toString()
    },()=>{
      var xhttp = new XMLHttpRequest();
      var newReply = {
        replyContent : this.state.replyContent,
        updateTime : this.state.replyUpdateTime,
        like: []
      };
      xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
          var replyId = JSON.parse(xhttp.responseText);
          _this.updatePostReply(replyId);
          _this.addReply(replyId);
          console.log(replyId);
          _this.setState({
            replyContent: ''
          });
        }
      }
      xhttp.open("POST", "/reply");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newReply));
    });
  }
  updatePostReply(replyId){
    var _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var length = _this.state.replyLen + 1;
        _this.setState({
          replyLen: length
        });
        _this.state.post_this.setState({
          replyLen: length
        });
      }
    }
    xhttp.open("PUT", "/post?type=reply&_id=" + this.state.post_id + "&replyId=" + replyId);
    xhttp.send();
  }
  addReply(replyId){
    this.state.replys.push(
      <li key={replyId}>
        <div className="row">
          <div className="comment">
            <hr></hr>
            <img src={this.state.memberApp.state.imgURL} className="post-userimg displayed" alt="" />
            <div>
              <span>{this.state.memberApp.state.idname}</span>
              <p>{this.state.replyContent}</p>
            </div>
          </div>
        </div>
      </li>
    );
    this.setState({
      replys: this.state.replys
    });
  }
  render(){
    return(
      <div id="detailModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="perPost-wrapper">
            {this.state.isMyPost > 0 &&
              <div>
                <div onClick={this.state.post_this.deletePost}  data-dismiss="modal" className="action-btn detail-action-btn detail-action-del">
                  <i className="fa fa-trash-o"></i>
                </div>
                <div onClick={this.state.post_this.setEditPostModal} href="#editPostModal"  data-dismiss="modal" data-toggle="modal" className="action-btn detail-action-btn detail-action-edit">
                  <i className="fa fa-pencil"></i>
                </div>
              </div>
            }
              <div className="panel-body">
              {this.state.haveImg ? (
                <img src={ this.state.imgURL } className="img-responsive margin-center" />
              ):(
                <p >{ this.state.postcontent }</p>
              )}
              </div>
              <div className="panel-body-name">
                <div className= "row panel-body-margin-bottom">
                  <div className="detail-user-img">
                    <img src={ this.state.postUserImg } className="post-userimg displayed" alt="" />
                  </div>
                  <div className="detail-user-name">
                    <p> { this.state.postUserName } </p>
                  </div>
                  <div className={this.state.iLike ? 'detail-likes post-likes-active' :'detail-likes post-likes-normal'}>
                    <p> {this.state.likeLen} </p>
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  </div>
                  <div className="detail-comments post-comments-normal">
                    <p> {this.state.replyLen} </p>
                    <i className="fa fa-comment" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-body-content margin-bottom-50">
                  <div className="post-time">
                    <p>{this.state.updateTime}</p>
                  </div>
                {this.state.haveImg > 0 &&
                  <p>{this.state.postcontent}</p>
                }
                </div>
                <div className='all-comment-toggle'>
                  <hr></hr>
                  <span onClick={this.toggleComment} className="cursor-pointer">
                    {this.state.replyLen} comments <i className={this.state.isCommentsShow ? 'fa fa-caret-down rotate' :'fa fa-caret-down'}></i>
                  </span>
                  <div className={this.state.isCommentsShow ? 'reply-collapse expanded' :'reply-collapse'}>
                    <ul className="all-comment">
                      {this.state.replys}
                    </ul>
                  </div>
                </div>
                {this.state.memberApp.state.login >0 &&
                  <div className="row">
                    <div className="response">
                      <hr></hr>
                      <img src={ this.state.memberApp.state.imgURL } className="post-userimg displayed" alt="" />
                      <div>
                        <textarea value={this.state.replyContent} onChange={(event) => this.setState({replyContent: event.target.value})} name="replyContent" type="text" rows="1" placeholder="回應..."></textarea>
                      </div>
                      <button onClick={this.submitForm} type="submit" value="Upload reply" className="submitBtn" aria-hidden="true">送出</button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
