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
    this.changePostcontent = this.changePostcontent.bind(this);
  }
  changePostcontent(){
    var textarea = document.getElementById('content_input');
    this.setState({
      postcontent : textarea.value
    });
  }
  changeFileName(){
    var input = document.getElementById('img-input');
    document.getElementById('post-img-name').innerHTML = input.files[0].name;
    var output = document.getElementById('output-img-preview');
    output.src = URL.createObjectURL(input.files[0]);
    var div = document.getElementById("post-img-div");
    div.className += " img-div-style";
    div.classList.remove("display-none");
    this.setState({
      imgFile : input.files[0],
      imgURL: output.src
    });
  }
  removeImg(){
    var input = document.getElementById('img-input');
    input.value = "";
    document.getElementById('post-img-name').innerHTML = "請選擇一張照片";
    var output = document.getElementById('output-img-preview');
    output.src = "";
    var div = document.getElementById("post-img-div");
    div.className += " display-none";
    div.classList.remove("img-div-style");
    this.setState({
      imgFile : null,
      imgURL: null
    });
  }
  memberAppReBuildPost(){
    this.state.memberApp.reBuildPost();
  }
  createTempPost(){
    var tempPost = {
      userid:{
        idname: this.state.memberApp.state.idname,
        imgURL: this.state.memberApp.state.imgURL
      },
      postcontent: this.state.postcontent,
      imgURL: this.state.imgURL,
      updateTime: this.state.updateTime
    }
    this.state.memberApp.refs.content.addTempPost(tempPost,0);
  }
  imgUpload(callback){
    if(this.state.imgFile == null){
      this.setState({
        imgURL: null
      },()=>{
        callback();
      });
    }else{
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                 .field('file', this.state.imgFile);
      console.log('upload to cloudinary...');
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        console.log('upload completed!');
        console.log('response.body.secure_url: ' + response.body.secure_url);
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
        console.log('1');
        _this.createTempPost();
        console.log(_this.state.memberApp.refs.content);
        _this.imgUpload(function(){
          var xhttp = new XMLHttpRequest();
          var newPost = {
            postcontent : _this.state.postcontent,
            imgURL: _this.state.imgURL,
            updateTime : _this.state.updateTime
          };
          xhttp.onreadystatechange = function () {
            if(xhttp.readyState == 4 && xhttp.status == 200){
              _this.state.memberApp.reBuildPost();
              _this.state.memberApp.refs.content.refresh();
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
      <div id="postModal" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <button onClick={this.memberAppReBuildPost} type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        			更新你的近況
              </div>
        			<form id="post_form" className="form center-block" method="post" action="/post" enctype="multipart/form-data">
        	      <div className="modal-body">

        	            <div className="form-group">
        	              <textarea id="content_input" value={this.state.postcontent} onChange={this.changePostcontent} name="postcontent" type="text" className="form-control input-lg" rows="4" placeholder="想分享什麼？"></textarea>
        								<div className="row">
        									<div id="post-img-div" className="img-hover display-none col-sm-7 col-xs-7">
        										<img id="output-img-preview" className="img-responsive margin-center"/>
        										<button onClick={this.removeImg} id="delete-btn" type="button" className="btn-img-delete close">×</button>
        									</div>
        								</div>
        	            </div>

        	      </div>
        	      <div className="modal-footer">
    							<div className="image-upload">
    								<label htmlFor="img-input">
    		        			<i className="fa fa-picture-o" aria-hidden="true">  <span id="post-img-name">選擇一張照片</span></i>
    		    				</label>
    		    				<input id="img-input" type="file" name="userPhoto" onChange={this.changeFileName}/>
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
