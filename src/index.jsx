console.log('I am alive!');

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'

import App from './components/App'
import Home from './components/Home'
import EntityTypes from './components/EntityTypes'
import EntityTypeForm from './components/EntityTypeForm'

render((
	  <Router history={hashHistory}>
	   { /* the top level route contains the main box of the application */}
	    <Route path="/" component={App}>
	    	<IndexRoute component={Home}/>
	    	<Route path="/entitytypes" component={EntityTypes}>
	    		<Route path="/entitytypes/:namespace/:entityTypeName" component={EntityTypeForm}/>
	    	</Route>
	    </Route>
	  </Router>
		), 
		document.getElementById('app'))

