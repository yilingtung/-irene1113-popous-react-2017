import React, {Component} from 'react';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'popousUserImg';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxwnkzsxe/image/upload';

export default class Edit extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberApp: this.props.memberApp
    };
    this.submitForm = this.submitForm.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  changeFileName(event){
    var output = document.getElementById('edit-img-preview');
    output.onload = function(){
      var width = output.naturalWidth;
      var height = output.naturalHeight;
      if(width <= height){
        var mini = width;
      }else{
        var mini = height;
      }
      console.log('width: ' + width + "; height: " + height + "; mini: " + mini);
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = function() {
        if(width <= height){
          this.clipImage(img, 0, (height/2)-(mini/2), mini, mini);
        }else{
          this.clipImage(img, (width/2)-(mini/2), 0, mini, mini);
        }
      };
      img.onload = img.onload.bind(this);
      img.src = output.src;
    };
    output.onload = output.onload.bind(this);
    this.setState({
      haveImg: true,
      imgURL: URL.createObjectURL(event.target.files[0]),
      imgFile: event.target.files[0],
      imgFileName: event.target.files[0].name,
      inputValue: event.target.value
    });
  }
  clipImage(image, clipX, clipY, clipWidth, clipHeight) {
    document.getElementById("canvas").getContext("2d").drawImage(image, clipX, clipY, clipWidth, clipHeight, 0, 0, 239, 239);
    this.setState({
      imgContentData : document.getElementById("canvas").toDataURL()
    });
  }
  imgUpload(callback){
    if(this.state.imgFile == null){
      callback();
    }else{
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                 .field('file', this.state.imgContentData);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
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
    var _this = this;
    _this.imgUpload(function(){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
          var object = JSON.parse(xhttp.responseText);
          _this.setState({
            update_message : object.update_message,
            update_status : object.update_status
          });
          if(_this.state.update_status == 0){
            _this.setState({
              newidname : _this.state.idname
            });
          }
          else if(_this.state.update_status == 1){
            window.location.href = "/member";
          }
        }
      }
      if(_this.state.newidname == undefined){
        _this.setState({
          newidname : _this.state.idname
        });
      }
      var newUserInfo = {
        idname: _this.state.newidname,
        imgURL: _this.state.imgURL
      };
      xhttp.open("PUT", "/memberInfo");
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(newUserInfo));
    });
  }
  render(){
    return(
      <div id="editModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
    		<div className="modal-dialog">
    			<div className="modal-content">
    				<div className="modal-header">
    					<button type="button" className="close"  data-dismiss="modal" aria-hidden="true">×</button>
    					<i className="fa fa-pencil-square-o" aria-hidden="true"></i><span className="edit-title">編輯你的個人資料</span>
    				</div>
    				<div className="modal-body">
    					<form id="edit-person-form" className="form center-block" method="put" enctype="multipart/form-data">
    						<div className="form-group">
    							<div className= "row form-row-magin">
    								<div id="edit-userphoto-div" className= "margin-center">
                      <canvas id="canvas" width="239" height="239" className={this.state.haveImg ? ('img-responsive displayed margin-center') : ('display-none img-responsive displayed margin-center')}></canvas>
    									<img src={this.state.imgURL} id="edit-img-preview" className={this.state.haveImg ? ('display-none img-responsive displayed margin-center') : ('img-responsive displayed margin-center')} alt="" />
    								</div>
    							</div>
    							<div className="row form-row-magin">
    								<div className="col-xs-3 col-sm-3 text-align-center">
    									<h5>修改名字</h5>
    								</div>
    								<div className="col-xs-9 col-sm-6">
    							  	<input value={this.state.newidname}
                      onChange={(event) => this.setState({newidname: event.target.value})}
                      placeholder={this.state.idname} id="edit-idname" type="text" className="edit-name form-control input-lg" />
    								</div>
    								<div className="col-sm-3 text-align-center">
    									<p id="update-err" className="ajax-message">{this.state.update_message}</p>
    								</div>
    							</div>
    							<div className="row form-row-magin">
    								<div className="col-xs-3 col-sm-3 text-align-center">
    									<h5>更新大頭貼</h5>
    								</div>
    								<div className="col-xs-9 col-sm-6 margin-center">
    									<div className="image-upload pull-left list-inline">
    										<label htmlFor="edit-img-input">
    											<i className="fa fa-file-image-o fa-2x" aria-hidden="true">  <span id="edit-img-name" className="itag-img">{this.state.imgFileName ? (this.state.imgFileName) : ('選擇一張照片')}</span></i>
    				    				</label>
    				    				<input id="edit-img-input" type="file" name="userPhoto" value={this.state.inputValue} onChange={this.changeFileName}/>
    									</div>
    								</div>

    							</div>
    						</div>
    						<div className="modal-footer">
    							<div className="row">
    								<div className="col-sm-2 col-xs-12 float-right">
    									<a onClick={this.submitForm} className="btn btn-primary btn-sm btn-block" href="javascript:{}">Submit</a>
    								</div>
    							</div>
    						</div>
    					</form>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}
