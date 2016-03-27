import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h3>Welcome to Barley Boy!</h3>
        <ul>
         <li><NavLink to="/entitytypes">EntityTypes</NavLink></li>
        </ul>
      </div>
    )
  }
})