import React from 'react'

import t from 'tcomb-form';
import transform from 'tcomb-json-schema';

const Form = t.form.Form;

export default React.createClass({
	
 getInitialState : function() {
    return {
      formSchema : transform({
    		"title": "None",
    		"type": "object",
    		"properties": {
    		}
    	})
    };
  },

  componentDidMount: function() {
	  const that = this;
	  const props = this.props;
	  if (props.entityTypeName != null) {
		  fetch('/barleyrs/entitytypes/' + props.namespace + '/' + props.entityTypeName)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		  	const formSchema = transform( json );
		  	that.setState({ formSchema: formSchema })
		  });
	  }
  },

  componentWillReceiveProps: function(props) {
	  const that = this;
	  if (props.entityTypeName != null) {
		  fetch('/barleyrs/entitytypes/' + props.namespace + '/' + props.entityTypeName)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		  	const formSchema = transform( json );
		  	that.setState({ formSchema: formSchema })
		  });
	  }
  },

  onChange: function() {
	console.log("on change");  
  },

  save: function() {
	console.log("save");  
  },

  render: function() {
	  return this.props.entityTypeName ?  
      <div>
        <h2>{this.props.entityTypeName} editor</h2>
    	<Form ref="form" 
  		  type={this.state.formSchema}
  		  onChange={this.onChange} />
  		<button onClick={this.save}>Save</button>
        
      </div>
     : <div>no params</div>
  }
})