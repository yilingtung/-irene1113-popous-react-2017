import React, {Component} from 'react';
import PerPost from './perPost';
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 1000
};
export default class Content extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts:null
    };
    this.refresh();
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('shouldComponentUpdate in content');
    return true;
  }
  refresh(callback){
    var xhttp = new XMLHttpRequest();
    var fromPost = 0;
    var count = 1;
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var resObject = JSON.parse(xhttp.responseText);
        var object = resObject.map((value, index) => {
          var isMyPost;
          if(this.props.userId == value.userid._id){isMyPost = true;
          }else{isMyPost = false;}
          console.log(value);
          return (<PerPost post={value} key={value._id} index={index} isMyPost={isMyPost} memberApp={this.props.memberApp} isProcessing={false}/>);
        });
        (callback && typeof(callback) === "function") && callback();
        this.setState({posts:object});
        fromPost += count;
        document.getElementById('loading').style.display = "none";
      }
    }
    xhttp.open("GET","/post?from=" + fromPost + "&count=" + count);
    xhttp.send();
  }
  addTempPost(post, index){
    this.state.posts.unshift(<PerPost post={post} key={index} index={index} isMyPost={true} memberApp={this.props.memberApp} isProcessing={true}/>);
    this.setState({posts:this.state.posts});
  }
  render(){
    return(
      <div className="padding height-100">
          <div className="full col-sm-9 height-100">
            <div id="loading" className="loading"></div>

            <Masonry
              className={'my-gallery-class'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
                   {this.state.posts}
            </Masonry>
          </div>
      </div>

    );
  }
}
