//we control how our link looks for react router links
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeStyle={{ color: 'red' }}/>
  }
})