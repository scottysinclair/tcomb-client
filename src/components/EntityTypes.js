import React from 'react'

import EntityTypeNav from './EntityTypeNav'
import EntityListing from './EntityListing'
import EntityTypeForm from './EntityTypeForm'

export default React.createClass({
	
 getInitialState : function() {
    return {
      entityTypes: [],
      formSchema : {
    	  "schema" : {
			"title": "None",
			"type": "object",
			"properties": {}
    	   },
		   "options": {}
    	  },
      saveCount: 0,
      formData: null
    };
  },
  
  setEntityTypesAndFormSchema: function(entityTypes, formSchema) {
	    this.setState({
	    	entityTypes: entityTypes,
	        formSchema : formSchema,
	        saveCount: this.state.saveCount,
	        formData: this.state.formData
	      });
  },
  
  incSaveCount: function(entity) {
	    this.setState({
	    	entityTypes: this.state.entityTypes,
	        formSchema : this.state.formSchema,
	        saveCount: this.state.saveCount+1,
	        formData: entity
	      });
  },
  
  setSelectedEntity: function(entity) {
	    this.setState({
	    	entityTypes: this.state.entityTypes,
	        formSchema : this.state.formSchema,
	        saveCount: this.state.saveCount,
	        formData: entity
	      });
  },
	
  componentDidMount: function() {
	  const that = this;
	  /*
	   * fetch list of entity typess
	   */
	  fetch('/barleyrs/entitytypes/')
	  .then(function(response) {
	    return response.json()
	  })
	  .then(function(entityTypes) {
		  /*
		   * if we have some entity types then get the form schema for the first one.
		   */
	  	if (entityTypes.length > 0) {
	  		that.getJSONSchema(entityTypes[0].namespace, entityTypes[0].fqn)
	  		.then(function(formSchema) {
	  			that.setEntityTypesAndFormSchema(entityTypes, formSchema);
	  		})
	  		.catch(err => {
	  			/*
	  			 * when getting the form schema fail
	  			 */
	  			that.setEntityTypesAndFormSchema(entityTypes, []);
	  		});
	  	}
	  	
	  	
	  });
	  
	  /*
	   * fetch the schema for the current one
	   */
  },
  
  getJSONSchema: function(namespace, entityTypeName) {
	  return fetch('/barleyrs/entitytypes/' + namespace + '/' + entityTypeName)
	  .then(function(response) {

		  console.log("ET -> GJS");
		  return response.json()
	  });
  },
  
  componentWillReceiveProps: function(props) {
	  console.log("ET -> componentWillReceiveProps");
	  const that = this;
	  if (props.params != null && props.params.namespace != null && props.params.entityTypeName != null) {
		  that.getJSONSchema(props.params.namespace, props.params.entityTypeName)
		  .then(function(formSchema){
	  			that.setEntityTypesAndFormSchema(that.state.entityTypes, formSchema);
		  })
	  }
  },  
  
  render() {
	  /*
	   * default to the first entity in the list
	   */
     let namespace = this.state.entityTypes[0] ? this.state.entityTypes[0].namespace : null;
     let entityTypeName = this.state.entityTypes[0] ? this.state.entityTypes[0].fqn : null;
     if (this.props.params != null) {
       if (this.props.params.namespace != null) {
    	 namespace = this.props.params.namespace;
       }
	   if (this.props.params.entityTypeName != null) {
		 entityTypeName = this.props.params.entityTypeName;
	   }
	   if (this.props.params.entityTypeName != null) {
		 entityTypeName = this.props.params.entityTypeName;
	   }
     }
     
     const navStyle = {
             display: 'inline-block',
             width: '15%',
             marginRight: '1%',
       		 verticalAlign: 'top'
     };

     const centerStyle = {
             display: 'inline-block',
             width: '79%'
     };

	 return  (
      <div>
        <div style={navStyle}>
        	<EntityTypeNav entityTypes={this.state.entityTypes} />
        </div>
        <div style={centerStyle}>
            <h4>{entityTypeName}</h4>
            <EntityListing
            	namespace={namespace} 
            	entityTypeName={entityTypeName} 
            	formSchema={this.state.formSchema.schema}
                saveCount={this.state.saveCount}
            	entitySelected={e => this.setSelectedEntity(e)}/>

            <hr size="1"/>

        	<EntityTypeForm 
        		namespace={namespace} 
            	entityTypeName={entityTypeName} 
            	formSchema={this.state.formSchema}
                formData={this.state.formData}
                handleEntitySaved={e => this.incSaveCount(e)}
            />
        </div>
      </div>
    )
  }
})