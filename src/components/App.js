import React from 'react'


export default React.createClass({
  render() {
    return  (
    	      <div>
    	        <h1>Generic Application</h1>

    	        {/* render children  */}
    	        {this.props.children}

    	      </div>
    	    )
  }
})

