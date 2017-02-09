import React, {Component} from 'react';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'popousUserImg';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxwnkzsxe/image/upload';


export default class EditPost extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp
    };
    this.changePostcontent = this.changePostcontent.bind(this);
    this.removeImg = this.removeImg.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillMount(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        console.log(object);
        this.setState(
          {
            _id: object._id,
            userid: object.userid,
            postcontent: object.postcontent,
            imgURL: object.imgURL,
            updateTime: object.updateTime,
            mgFile: null,
            oldPostcontent: object.postcontent,
            oldimgURL: object.imgURL
          }
        );
      }
    }
    xhttp.open("GET","/perPostInfo?_id=" + this.state.memberApp.state.perPostId);
    xhttp.send();

  }
  changePostcontent(){
    var textarea = document.getElementById('content_input');
    this.setState({
      postcontent : textarea.value
    });
  }
  removeImg(){
    var input = document.getElementById('editPost_img-input');
    input.value = "";
    document.getElementById('editPost_post-img-name').innerHTML = "新增圖片";
    var output = document.getElementById('editPost_output-img-preview');
    output.src = "";
    var div = document.getElementById("editPost_post-img-div");
    div.className += " display-none";
    div.classList.remove("img-div-style");
    this.setState({
      imgURL: null,
      imgFile : null
    });
  }
  changeFileName(){
    var input = document.getElementById('editPost_img-input');
    document.getElementById('editPost_post-img-name').innerHTML = input.files[0].name;
    var output = document.getElementById('editPost_output-img-preview');
    output.src = URL.createObjectURL(input.files[0]);
    var div = document.getElementById("editPost_post-img-div");
    div.className += " img-div-style";
    div.classList.remove("display-none");
    this.setState({
      imgFile : input.files[0]
    });
  }
  createTempPost(){
    var tempPost = {
      userid:{
        idname: this.state.memberApp.state.idname,
        imgURL: this.state.memberApp.state.imgURL
      },
      postcontent: this.state.oldPostcontent,
      imgURL: this.state.oldimgURL,
      updateTime: this.state.updateTime
    }
    this.state.memberApp.postPreprocess("previous",tempPost,this.state.memberApp.state.perPostIndex);
  }
  imgUpload(callback){
    if(this.state.imgFile == null){
      callback();
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
        console.log('response.body.secure_url: '+response.body.secure_url);
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
    var _this = this;
    _this.createTempPost();
    _this.imgUpload(function(){
      var xhttp = new XMLHttpRequest();
      var newPost = {
        _id: _this.state._id,
        userid:_this.state.userid,
        postcontent:_this.state.postcontent,
        imgURL:_this.state.imgURL,
        updateTime:_this.state.updateTime
      };
      xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
          _this.state.memberApp.refreshContent();
          _this.state.memberApp.reBuildPost();
        }
      }
      xhttp.open("PUT", "/post");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newPost));
    });
  }
  render(){
    return(
      <div id="editPostModal" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        			編輯貼文
              </div>
        			<form id="editPost_post_form" className="form center-block" method="post" action="/post" enctype="multipart/form-data">
        	      <div className="modal-body">

        	            <div className="form-group">
        	              <textarea id="editPost_content_input" value={this.state.postcontent} onChange={(event) => this.setState({postcontent: event.target.value})} name="postcontent" type="text" className="form-control input-lg" rows="4" placeholder="想分享什麼？"></textarea>
        								<div className="row">
                        {this.state.imgURL?(
                          <div id="editPost_post-img-div" className="img-hover img-div-style col-sm-3 col-xs-3">
        										<img src={this.state.imgURL} id="editPost_output-img-preview" className="img-responsive margin-center"/>
        										<button onClick={this.removeImg} id="editPost_delete-btn" type="button" className="btn-img-delete close">×</button>
        									</div>
                        ):(
                          <div id="editPost_post-img-div" className="img-hover display-none col-sm-3 col-xs-3">
        										<img src={this.state.imgURL} id="editPost_output-img-preview" className="img-responsive margin-center"/>
        										<button onClick={this.removeImg} id="editPost_delete-btn" type="button" className="btn-img-delete close">×</button>
        									</div>
                        )}
        								</div>
        	            </div>

        	      </div>
                <div className="modal-footer">
    							<div className="image-upload">
    								<label htmlFor="editPost_img-input">
    		        			<i className="fa fa-picture-o" aria-hidden="true">  <span id="editPost_post-img-name">換一張圖片</span></i>
    		    				</label>
    		    				<input id="editPost_img-input" type="file" name="userPhoto" onChange={this.changeFileName}/>
    							</div>
    		          <button onClick={this.submitForm} type="submit" value="Upload userpost" className="submitBtn" data-dismiss="modal" aria-hidden="true">儲存</button>
        	      </div>
        		</form>
          </div>
        </div>
      </div>
    );
  }
}
