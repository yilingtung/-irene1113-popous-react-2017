import React, {Component} from 'react';


class TempPost extends Component {
  constructor(props){
    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    super(props);
    this.state = {};
    
  }
  render(){
    return(
      <div className="col-sm-4 col-xs-12 image-element-class">
        <div className="panel panel-default">
          <div className="processing"></div>
          <div className="processing-wrapper">
          {this.props.post.imgURL ? (
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
                <p>{ this.props.post.updateTime }</p>
              </div>
            </div>
          </div>
          {this.props.post.imgURL ? (
            <div className="panel-body">
              <p >{ this.props.post.postcontent }</p>
            </div>
          ):(
            <div className="panel-body">
              <p ></p>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default TempPost;
