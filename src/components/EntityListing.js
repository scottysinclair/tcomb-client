import React from 'react'

import NavLink from './NavLink'

export default React.createClass({

 getInitialState : function() {
    return {
      selectedEntity : null,
      entities : []
    };
  },
	  
  componentDidMount: function() {
	  this.loadEntities(this.props);
  },
  
  componentWillReceiveProps: function(newprops) {
	  if (newprops.entityTypeName !== this.props.entityTypeName) {
		  this.loadEntities(newprops);
	  }
  },
  
  loadEntities: function(props) {
	  const that = this;
	  console.log("LOADING ENTITIES");
	  if (props.entityTypeName != null) {
		  fetch('/barleyrs/tables/' + props.namespace + '/' + props.entityTypeName)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		  	that.setState({ entities: json })
		  });
	  }
  },
  
  deleteEntity: function(entry) {
	  const that = this;
   	  fetch('/barleyrs/entities/' + this.props.namespace + "/" + this.props.entityTypeName, {
			method: 'delete',
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			body: JSON.stringify( entry )
		   })
		   .then(function(response){
			   that.loadEntities(that.props);
		   });
  },
  
  rowSelected: function(entity) {
	  this.setState({
		  selectedEntity: entity,
		  entities: this.state.entities
	  });
	  //call up the chain
	 this.props.entitySelected( this.fixRelations(entity) );
  },
  
  /**
   * 1:1 fk relation values are an array with elements '[id,name]', this needs
   * to get converted to just 'id'
   */
  fixRelations: function(entity) {
	  var obj = {};
	  {Object.getOwnPropertyNames( entity ).map(prop => {
			  if (typeof entity[prop] === "object" && entity[prop] !== null) {			  
				  obj[prop] = '' + entity[prop]['id'];
			  }
			  else {
				  obj[prop] = entity[prop];
			  }
		  });
	  }
	  console.log(obj);
	  return obj;
  },
  
  getSelectedRowClass: function(entity) {
	  console.log(entity + "    " + (entity === this.state.selectedEntity));
	  return (entity === this.state.selectedEntity) ? "success" : "";
  },
			
  render: function() {
	const that = this;
	let row = 0;
	
    return (
      <div className="panel panel-default">
      		<div className="panel-heading">Data</div>
      		<div className="panel-body">
		      <table width="80%" className="table table-bordered table-striped table-hover">
		        <thead>
	  	          <tr>
		        	{Object.keys(that.props.formSchema.properties).map(prop =>
		        	  <th>{prop}</th>
		        	)}
		        	<th width="20px">Delete</th>
			     </tr>
		        </thead>
		        <tbody>
		        {that.state.entities.map(entry =>
		        	<tr key={'eltr-' + (row++)} className={ that.getSelectedRowClass(entry) }>
		        	{Object.keys(that.props.formSchema.properties).map(prop =>
		        	  <td onClick={e => that.rowSelected(entry)}>{ (entry[prop] != null && (typeof entry[prop] === 'object')) ? entry[prop].name  : entry[prop] }</td>
		        	)}
		        	<td><span className="glyphicon glyphicon-trash" aria-hidden="true" onClick={e => that.deleteEntity(entry)}></span></td>
		        	</tr>
		        )}
		        </tbody>
		        </table>
		    </div>
      </div>
    )
  }
})