import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import {Route} from 'react-router';
import App from './components/App';

const pair = ['Trainspotting', '28 Days Later'];

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
</Route>;

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);
