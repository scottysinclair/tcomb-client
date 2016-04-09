import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
	
 getInitialState : function() {
    return {
      entities : []
    };
  },
	  
  componentDidMount: function() {
	  this.loadEntities(this.props);
  },
  
  componentWillReceiveProps: function(props) {
	  this.loadEntities(props);
  },
  
  loadEntities: function(props) {
	  const that = this;
	  if (props.entityTypeName != null) {
		  fetch('/barleyrs/entities/' + props.namespace + '/' + props.entityTypeName)
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
		        	<th>Delete</th>
			     </tr>
		        </thead>
		        <tbody>
		        {that.state.entities.map(entry =>
		        	<tr key={'eltr-' + (row++)}>
		        	{Object.keys(that.props.formSchema.properties).map(prop =>
		        	  <td>{entry[prop]}</td>
		        	)}
		        	<td><a onClick={e => that.deleteEntity(entry) }>Delete</a></td>
		        	</tr>
		        )}
		        </tbody>
		        </table>
		    </div>
      </div>
    )
  }
})