import React, {Component} from 'react';

export default class Oops extends Component{

  render(){
    return(
      <div className="padding">
          <div className="full col-sm-9 text-align-center">
            <i className="big-icon fa fa-frown-o" aria-hidden="true"></i>
            <h1>OOPS!!</h1>
            <h4> We can{'\''}t find the page you{'\''}re looking for. </h4>
          </div>
      </div>

    );
  }
}
