import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import jdenticon from "jdenticon"
import {connect} from "react-redux";

class NetworkInfo extends Component {

  constructor (props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  componentDidMount() {
    const bytom = this.props.bytom
    if (
      bytom
      && bytom.default_account
    ) {
      this.setState({ account: bytom.default_account })
    }
  }

  render() {
    const account = this.state.account
    const bytom = this.props.bytom
    if (
      bytom
      && bytom.default_account
    ) {
      const svg = jdenticon.toSvg(account.alias, 40)
      return (
        <div className="navbar-nav">
          <div className="nav-item  d-flex ">
            <NavLink  exact activeClassName="active" className="d-flex nav-link rounded js-scroll-trigger" to='/account'>
              <div className="mr-2" dangerouslySetInnerHTML={{__html:svg}} />
              <div className="mt-auto mb-auto ">{bytom.default_account.alias}</div>
            </NavLink>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  bytom: state.bytom
})

export default connect(mapStateToProps)(NetworkInfo)
