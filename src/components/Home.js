import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h3>You can create and configure entities to your heart's content</h3>
        <ul>
         <li><NavLink to="/entitytypes">EntityTypes</NavLink></li>
        </ul>
      </div>
    )
  }
})