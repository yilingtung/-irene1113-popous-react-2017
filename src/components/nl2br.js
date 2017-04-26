import React, {Component} from 'react';

export default class Nl2br extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
    console.log(typeof props.str === 'string');
  }
  render(){
    return(
      <span>
      {
        typeof this.props.str === 'string' &&
          this.props.str.split('↵').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })
      }
      </span>
    );
  }
}
