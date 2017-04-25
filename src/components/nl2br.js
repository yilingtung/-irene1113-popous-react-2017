import React, {Component} from 'react';

export default class Nl2br extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
    return(
      <span>
      {
        typeof str === 'string' ?
          this.props.str
        :
          this.props.str.split('↵').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })
      }
      </span>
    );
  }
}
