import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IndexApp from './components/indexApp';
import MemberApp from './components/memberApp';
import OthersApp from './components/othersApp';
import { Router, Route, hashHistory } from 'react-router';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={IndexApp} />
    <Route path="/member" component={MemberApp} />
    <Route path="/groups" component={OthersApp} />
    <Route path="/bookmarks" component={OthersApp} />
    <Route path="/game" component={OthersApp} />
    <Route path="/messages" component={OthersApp} />
  </Router>
),document.querySelector('.index-container')
);
