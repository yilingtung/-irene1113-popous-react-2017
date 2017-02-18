import React, {Component} from 'react';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'mbmo4mtb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxwnkzsxe/image/upload';

export default class Post extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
    this.removeImg = this.removeImg.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  changeFileName(event){
    this.setState({
      haveImg: true,
      imgURL: URL.createObjectURL(event.target.files[0]),
      imgFile: event.target.files[0],
      imgFileName: event.target.files[0].name,
      inputValue: event.target.value
    });
  }
  removeImg(){
    this.setState({
      haveImg: false,
      imgURL: null,
      imgFile: null,
      imgFileName: null,
      inputValue:null
    });
  }
  createNewPost(){
    var newPost = {
      userid:{
        idname: this.state.memberApp.state.idname,
        imgURL: this.state.memberApp.state.imgURL
      },
      postcontent: this.state.postcontent,
      imgURL: this.state.imgURL,
      updateTime: this.state.updateTime
    }
    this.state.memberApp.refs.content.addNewPost(newPost,0);
  }
  imgUpload(callback){
    if(this.state.imgFile == null){
      callback();
    }else{
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                 .field('file', this.state.imgFile);
      upload.end((err, response) => {
        if (err) {console.error(err);}
        console.log('upload completed!');
        if (response.body.secure_url !== '') {
          this.setState({
            imgURL: response.body.secure_url
          },()=>{
            callback();
          });
        }
      });
    }
  }
  submitForm(){
    if((this.state.postcontent != null) || (this.state.imgFile != null)){
      var _this = this;
      var d = new Date();
      this.setState({
        updateTime: d.getTime().toString()
      },()=>{
        _this.createNewPost();
        _this.imgUpload(function(){
          var xhttp = new XMLHttpRequest();
          var newPost = {
            postcontent : _this.state.postcontent,
            imgURL: _this.state.imgURL,
            updateTime : _this.state.updateTime,
            like: []
          };
          xhttp.onreadystatechange = function () {
            if(xhttp.readyState == 4 && xhttp.status == 200){
              _this.state.memberApp.refs.content.refresfNewPost(_this.state.memberApp.state.id, _this.state.updateTime);
            }
          }
          xhttp.open("POST", "/post");
          xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhttp.send(JSON.stringify(newPost));
        });
      });
    }
  }
  render(){
    return(
      <div id="postModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <button onClick={this.memberAppReBuildPost} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        			更新你的近況
              </div>
        			<form id="post_form" className="form center-block" method="post" action="/post" encType="multipart/form-data">
        	      <div className="modal-body">

        	            <div className="form-group">
        	              <textarea id="content_input" value={this.state.postcontent} onChange={(event) => this.setState({postcontent: event.target.value})} name="postcontent" type="text" className="form-control input-lg" rows="4" placeholder="想分享什麼？"></textarea>
        								<div className="row">
        									<div id="post-img-div" className={this.state.haveImg ? ('img-div-style img-hover col-sm-3 col-xs-3') : ('display-none img-hover col-sm-3 col-xs-3')}>
        										<img src={this.state.imgURL} id="output-img-preview" className="img-responsive margin-center"/>
        										<button onClick={this.removeImg} id="delete-btn" type="button" className="btn-img-delete close">×</button>
        									</div>
        								</div>
        	            </div>

        	      </div>
        	      <div className="modal-footer">
    							<div className="image-upload">
    								<label htmlFor="img-input">
    		        			<i className="fa fa-picture-o" aria-hidden="true">  <span id="post-img-name">{this.state.imgFileName ? (this.state.imgFileName) : ('選擇一張照片')}</span></i>
    		    				</label>
    		    				<input id="img-input" type="file" name="userPhoto" value={this.state.inputValue} onChange={this.changeFileName}/>
    							</div>
    		          <button onClick={this.submitForm} type="submit" value="Upload userpost" className="submitBtn" data-dismiss="modal" aria-hidden="true">發佈</button>
        	      </div>
        		</form>
          </div>
        </div>
      </div>
    );
  }
}
