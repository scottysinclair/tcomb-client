import React from 'react'

import EntityTypeNav from './EntityTypeNav'
import EntityTypeForm from './EntityTypeForm'

export default React.createClass({
  render() {
     let namespace = 'scott.picdb';
     let entityTypeName = 'Camera';
     if (this.props.params != null) {
       if (this.props.params.namespace != null) {
    	 namespace = this.props.params.namespace;
       }
	   if (this.props.params.entityTypeName != null) {
		 entityTypeName = this.props.params.entityTypeName;
	   }
     }
     
	 return  (
      <div>
        <h2>EntityTypes...</h2>
        <EntityTypeNav/>
        <EntityTypeForm namespace={namespace} entityTypeName={entityTypeName}/>
      </div>
    )
  }
})