import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import jdenticon from "jdenticon"

const NetworkInfo = class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  componentDidMount() {
    if (
      window.bytom
      && window.bytom.defaultAccount
    ) {
      this.setState({ account: window.bytom.defaultAccount })
    }
  }

  render() {
    const account = this.state.account

    if (
      account
    ) {
      const svg = jdenticon.toSvg(account.alias, 40)
      return (
        <div className="navbar-nav">
          <div className="nav-item  d-flex ">
            <NavLink  exact activeClassName="active" className="d-flex nav-link rounded js-scroll-trigger" to='/account'>
              <div className="mr-2" dangerouslySetInnerHTML={{__html:svg}} />
              <div className="mt-auto mb-auto ">{account.alias}</div>
            </NavLink>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default NetworkInfo
