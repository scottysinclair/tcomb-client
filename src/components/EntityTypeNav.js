import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h4>Entity Types</h4>
        {/* add some links */}
        <ul>
          <li><NavLink to="/entitytypes/scott.picdb/Camera">Cameras</NavLink></li>
          <li><NavLink to="/entitytypes/scott.picdb/Picture">Pictures</NavLink></li>
          <li><NavLink to="/entitytypes/scott.picdb/PrimaryAlbumb">Albumbs</NavLink></li>
          <li><NavLink to="/entitytypes/scott.picdb/Tag">Tags</NavLink></li>
        </ul>
      </div>
    )
  }
})