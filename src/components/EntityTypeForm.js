import React from 'react'

import t from 'tcomb-form';
import transform from 'tcomb-json-schema';


import Autosuggest from 'react-autosuggest'



http://localhost:8000/barleyrs/entities/scott.playspec/scott.playspec.model.Employee?proj=id,name

const languages = [
   {
     name: 'C',
     year: 1972
   },
   {
     name: 'Elm',
     year: 2012
   },
   {
     name: 'Javascript',
     year: 1995
   },
   {
     name: 'Python',
     year: 1991
   }
 ]

var departments = [];

 function getSuggestions(value) {
	fetch('/barleyrs/entities/scott.playspec/scott.playspec.model.Department?proj=id,name', {
		method: 'get',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
	   })
	   .then(function(response) {
		    return response.json()
		  }).then(function(json) {
			  departments = json;
		  });	   
	return departments.filter(dep => dep.name.indexOf(value) === 0)
	
 //  return languages.filter(language => language.name.indexOf(value) === 0)
 }

 function getSuggestionValue(suggestion) {
   return suggestion.name
 }

 function renderSuggestion(suggestion) {
   return (
     <span>{suggestion.name}</span>
   )
 }

 // define the template only once
 function getTemplate(options) {
   function renderInput(locals) {
     const value = locals.value || '' // react-autosuggest doesn't like null or undefined as value
     const inputProps = {
       ...locals.attrs,
       value: value,
       onChange: (evt, { newValue }) => {
         locals.onChange(newValue)
       }
     }
     const suggestions = options.getSuggestions(value)
     return (
       <Autosuggest
         suggestions={suggestions}
         getSuggestionValue={options.getSuggestionValue}
         renderSuggestion={options.renderSuggestion}
         inputProps={inputProps}
       />
     )
   }

   return t.form.Form.templates.textbox.clone({ renderInput })
 }

 // define the type
 const Type = t.struct({
   language: t.String
 })

 const options = {
   fields: {
     department: {
       attrs: {
         placeholder: 'Type C'
       },
       template: getTemplate({
         getSuggestions,
         getSuggestionValue,
         renderSuggestion
       })
     }
   }
 }









const Form = t.form.Form;

export default React.createClass({
	
 getInitialState : function() {
    return {
      formSchema : transform({
    		"title": "None",
    		"type": "object",
    		"properties": {
    		}
    	}),
    	options: {}
    };
  },

  componentDidMount: function() {
	  if (this.props.formSchema != null) {
	  	const transformed = transform( this.props.formSchema.schema );
	  	this.setState({ 
	  		formSchema: transformed,
	  		options: this.props.formSchema.options
	  	})
	  }
  },

  componentWillReceiveProps: function(props) {
	  if (props.formSchema != null) {
	  	const transformed = transform( props.formSchema.schema );
	  	this.setState({ 
	  		formSchema: transformed,
	  		options: props.formSchema.options
	  	})
	  }
  },

  onChange: function() {
	console.log("on change");  
  },

  save: function() {
	console.log("save");  
	const that = this;
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
		   })
		   .then(function(response){
			   that.props.handleEntitySaved(value);
		   });
    }
    else {
    	console.log(this.refs.form.validate());
    }
  },

  render: function() {
	  return this.props.entityTypeName ?  
	  <div className="panel panel-default">
	  <div className="panel-heading">Editor</div>
        <div className="panel-body">
	    	<Form ref="form" 
	  		  type={this.state.formSchema}
	    	  options={options}
	    	  value={this.props.formData}
	  		  onChange={this.onChange} />
	  		<button onClick={this.save}>Save</button>
	  	</div>
        
      </div>
     : <div></div>
  }
})