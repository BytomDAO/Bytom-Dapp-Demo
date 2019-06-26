import React, {
  Component
} from 'react'
import GetContractArgs from "../../constants";
import {connect} from "react-redux";

class Constants extends Component {

  render () {
    return (
      <header className="masthead bg-primary text-white">
        <div className="container">
          <table>
            <tbody>
            <tr>
              <td>
                <span className="mr-5">Deposit Asset ID: </span>
              </td>
              <td>{GetContractArgs(this.props.bytom).assetDeposited}</td>
            </tr>
            <tr>
              <td>
                <span className="mr-5">Bill Asset ID: </span>
              </td>
              <td>{GetContractArgs(this.props.bytom).assetBill}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </header>
    )
  }

}
const mapStateToProps = state => ({
  bytom: state.bytom
})

export default connect(mapStateToProps)(Constants)
