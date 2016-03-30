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
	  if (this.props.formSchema != null) {
	  	const transformed = transform( this.props.formSchema );
	  	this.setState({ formSchema: transformed })
	  }
  },

  componentWillReceiveProps: function(props) {
	  if (props.formSchema != null) {
	  	const transformed = transform( props.formSchema );
	  	this.setState({ formSchema: transformed })
	  }
  },

  onChange: function() {
	console.log("on change");  
  },

  save: function() {
	console.log("save");  
	const props = this.props;
    let value = this.refs.form.getValue();
    if (value != null) {
		fetch('/barleyrs/entities/' + props.namespace + "/" + props.entityTypeName, {
			method: 'post',
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			body: JSON.stringify(value)
		   });
    }
  },

  render: function() {
	  return this.props.entityTypeName ?  
	  <div className="panel panel-default">
	  <div class="panel-heading">Editor</div>
        <div class="panel-body">
	    	<Form ref="form" 
	  		  type={this.state.formSchema}
	  		  onChange={this.onChange} />
	  		<button onClick={this.save}>Save</button>
	  	</div>
        
      </div>
     : <div></div>
  }
})