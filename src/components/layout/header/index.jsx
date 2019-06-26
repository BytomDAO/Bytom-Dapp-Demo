import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import NetworkInfo from './NetworkInfo'

class Header extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
        <div className="container">
          <NavLink className="navbar-brand js-scroll-trigger" to="/">
            Bytom DApp Demo
          </NavLink>

          <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <NavLink  exact activeClassName="active" className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to='/'>Saving</NavLink>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <NavLink  exact activeClassName="active" className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"  to='/profit'>Profit</NavLink>
              </li>
            </ul>
            <NetworkInfo/>
          </div>

        </div>
      </nav>
    )
  }
}

export default Header
