import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
		
  render: function() {
    return (
      <div>
        <h4>Models</h4>
        {/* add some links */}
        <div className="list-group">
        {this.props.entityTypes.map(entry => 
        		<NavLink key={'et-' + entry.fqn} className="list-group-item" to={'/entitytypes/'+ entry.namespace + '/' + entry.fqn}>{entry.simpleName}</NavLink>
        )}
        </div>
      </div>
    )
  }
})