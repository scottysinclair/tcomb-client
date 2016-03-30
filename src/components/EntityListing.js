import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
	
 getInitialState : function() {
    return {
      entities : []
    };
  },
	  
  componentDidMount: function() {
	  const that = this;
	  const props = this.props;
	  if (props.entityTypeName != null) {
		  fetch('/barleyrs/entities/' + props.namespace + '/' + props.entityTypeName)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		  	that.setState({ entities: json })
		  });
	  }
  },
	
  
  componentWillReceiveProps: function(props) {
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
			     </tr>
		        </thead>
		        <tbody>
		        {that.state.entities.map(entry =>
		        	<tr key={'eltr-' + (row++)}>
		        	{Object.keys(that.props.formSchema.properties).map(prop =>
		        	  <td>{entry[prop]}</td>
		        	)}
		        	</tr>
		        )}
		        </tbody>
		        </table>
		    </div>
      </div>
    )
  }
})