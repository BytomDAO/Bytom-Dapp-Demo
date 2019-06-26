import React, { Component } from 'react'
import {connect} from "react-redux";

// This is a Higher Order Component (HOC) that wraps up any components that require
// an unlocked Bytom account instance
export default function(WrappedComponent) {

  // ...and returns another component...
  const BytomWrap = class extends Component {

    render () {
      let contents = <div />

      const bytom = this.props.bytom
      if (
        bytom
        && bytom.default_account
      ) {
        return <WrappedComponent {...this.props} />
      }
      else if (( bytom && !this.props.bytomConnection)) {
        return (
            <div className="columns">
              <div className="column" />
              <div className="column is-two-thirds">
                <h1 className="title">
                  Authenticate <strong>Bytom-Chrome-Extension</strong>.
                </h1>
                <p className="lead">
                  Please Authenticate the connection request.
                </p>
              </div>
              <div className="column" />
            </div>
        )
      } else if (( bytom )) {
        return (
            <div className="columns">
              <div className="column" />
              <div className="column is-two-thirds">
                <h1 className="title">
                  Hoo-ray! <strong>Bytom-Chrome-Extension</strong> is installed!
                </h1>
                <p className="lead">
                  However, you need to create a new account. Click the bytom icon in the top-right corner of your browser, then refresh the page.
                </p>
              </div>
              <div className="column" />
            </div>
        )
      } else {
        return (
            <div className="columns">
              <div className="column" />
              <div className="column is-two-thirds">
                <h1 className="title">
                  Hold up ...
                </h1>
                <p className="lead">
                  To use Dapp Demo you will need to install the Bytom-Chrome-Extension.
                </p>
                <p className="lead">
                  Please install the extension and refresh the page.
                </p>
                <br />
                <br />

              </div>
              <div className="column" />
            </div>
        )
      }

      return contents
    }

  }
  const mapStateToProps = state => ({
    bytom: state.bytom,
    bytomConnection: state.bytomConnection
  })
  return connect(mapStateToProps)(BytomWrap)
}
