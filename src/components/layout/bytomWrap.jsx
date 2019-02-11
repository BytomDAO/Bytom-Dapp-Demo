import React, { Component } from 'react'

// This is a Higher Order Component (HOC) that wraps up any components that require
// an unlocked Bytom account instance
export default function(WrappedComponent) {

  // ...and returns another component...
  const BytomWrap = class extends Component {

    render () {
      let contents = <div />

      if (
        window.bytom
        && window.bytom.defaultAccount
      ) {
        return <WrappedComponent {...this.props} />
      }
      else if (( window.bytom )) {
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

  return BytomWrap;

}
