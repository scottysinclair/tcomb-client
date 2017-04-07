import React from 'react'

import t from 'tcomb-form';
import transform from 'tcomb-json-schema';


import Autosuggest from 'react-autosuggest'



//http://localhost:8000/barleyrs/entities/scott.playspec/scott.playspec.model.Employee?proj=id,name



 function getSuggestions(value, allValues) {
	var departments = [];	 
/*	fetch(url, {
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
 */
	return allValues.filter( v => v.indexOf( value ) === 0);
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
     const _onSuggestionsFetchRequested = function() {
      fetch(options.fetchUrl, {
 		method: 'get',
 		headers: {
 		    'Accept': 'application/json',
 		    'Content-Type': 'application/json'
 		  }
 	   })
 	   .then(function(response) {
 		    return response.json()
 		  }).then(function(json) {
 			  options.suggestions = json;
 		  });	    
     }; 
     if (options.suggestions === undefined || options.suggestions == null) {
     	options.suggestions = [];
     }
     return (
       <Autosuggest
         suggestions={options.suggestions}
         onSuggestionsFetchRequested={_onSuggestionsFetchRequested}
       
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
       template: getTemplate({
         getSuggestions,
         getSuggestionValue,
         renderSuggestion,
         fetchUrl: '/barleyrs/entities/scott.playspec/scott.playspec.model.Department?proj=id,name'         
       })
     },
     countryOfOrigin: {
         template: getTemplate({
           getSuggestions,
           getSuggestionValue,
           renderSuggestion,
           fetchUrl: '/barleyrs/entities/scott.playspec/scott.playspec.model.Country?proj=id,name'         
         })
       },
     
   }
 }





function transformOptions(options) {
	 
	 if (options.fields === undefined || options.fields === null) {
		 return options;
	 }
	 var newOptions = { fields: {}};
//	 console.log(Object.keys( options.fields ));
	 for (var fieldName of Object.keys( options.fields )) {
/*		 console.log("KEY");
		 console.log(key);
		 console.log("KEYVALUE");
		 console.log(options.fields[key]);
		 */
		 var field = options.fields[ fieldName ];
//		 console.log(field);
//		 console.log(field["autosuggest"]);
		if (field.autosuggest != null) {
//			console.log(":::"  + field.autosuggest.namespace + "/" + field.autosuggest.entitytype);
			/*
			 * define the autosuggest option for tcomb
			 */
			var url = '/barleyrs/entities/' + field.autosuggest.namespace + '/' + field.autosuggest.entitytype + '?proj=id,name';
			newOptions.fields[ fieldName ] = {
		       template: getTemplate({
		           getSuggestions,
		           getSuggestionValue,
		           renderSuggestion,
		           fetchUrl: url         
		         })
			};
	         console.log(fieldName + ": " + url);
		}
		else {
			newOptions.fields[ fieldName ] = field;
		}
	 } 
	 console.log(newOptions);
	 return newOptions;
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
	  	//const transformedOptions = transformOptions( this.props.formSchema.options );
	  	this.setState({ 
	  		formSchema: transformed,
	  		options: this.props.formSchema.options
	  	})
	  }
  },

  componentWillReceiveProps: function(props) {
	  if (props.formSchema != null) {
	  	const transformed = transform( props.formSchema.schema );
	  //	const transformedOptions = transformOptions( this.props.formSchema.options );
	  	this.setState({ 
	  		formSchema: transformed,
	  		options: this.props.formSchema.options
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
	    	  options={this.state.options}
	    	  value={this.props.formData}
	  		  onChange={this.onChange} />
	  		<button onClick={this.save}>Save</button>
	  	</div>
        
      </div>
     : <div></div>
  }
})