import React, {Component} from 'react';
import PerPost from './perPost';
import TempPost from './tempPost';
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
    var xhttp = new XMLHttpRequest();
    var fromPost = 0;
    var count = 1;
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var resObject = JSON.parse(xhttp.responseText);
        var object = resObject.map((value, index) => {
          var isMyPost;
          if(this.props.userId == value.userid._id){isMyPost = 1;
          }else{isMyPost = 0;}
          return (<PerPost post={value} key={value._id} index={index} isMyPost={isMyPost} memberApp={this.props.memberApp}/>);
        });
        this.setState({posts:object});
        fromPost += count;
        document.getElementById('loading').style.display = "none";
      }
    }
    xhttp.open("GET","/post?from=" + fromPost + "&count=" + count);
    xhttp.send();
  }
  addTempPost(type, post, index){
    if (typeof type === "new") {
      this.state.posts.unshift(<TempPost post={post} key={index}/>);
    }else{
      this.state.posts.splice(index,1,<TempPost post={post} key={index}/>);
    }
    this.setState({posts:this.state.posts});
  }
  refresh(){
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
          return (<PerPost post={value} key={value._id} index={index} isMyPost={isMyPost} memberApp={this.props.memberApp}/>);
        });
        this.setState({posts:object});
        fromPost += count;
      }
    }
    xhttp.open("GET","/post?from=" + fromPost + "&count=" + count);
    xhttp.send();
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
