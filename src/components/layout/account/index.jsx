import React, {
  Component
} from 'react'
import { connect } from "react-redux"
import jdenticon from "jdenticon"
import action from "./action";
import GetContractArgs from "../../constants";
import { listBalances } from '../../util/api'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record: '',
      account:''
    };

    this.listBalance = this.listBalance.bind(this)
  }

  componentDidMount() {
    const bytom = this.props.bytom
    if (
      bytom
      && bytom.default_account
    ) {
      const account = bytom.default_account
      this.setState({ account })
      if(account){
        if(global.bytomAPI){
          this.props.updateBalances(account.accountId)
        }
        this.listBalance(account, GetContractArgs().assetDeposited)
      }
    }
  }

  listBalance(account, assetId){
    listBalances({address: account.address, asset:assetId})
      .then(resp =>{
        this.setState({
          record: resp.data
        })
      })
  }

  render () {
    if(!this.state.account){
      return <div></div>
    }

    const account = this.state.account
    const svg = jdenticon.toSvg(account.alias, 100)

    let record = <div></div>
    if(this.state.record !== '' && this.state.record.length !== 0){
      let list = []
      this.state.record.forEach(
        (re, i) =>{
          list.push( <tr key={'record'+i}>
            <th scope="row">{i}</th>
            <td>{re.amount}</td>
            <td>{new Date(re.create_at * 1000).toLocaleString()}</td>
          </tr>)
        }
      )
      record= <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Amount</th>
          <th scope="col">Time</th>
        </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    }else{
      record = <p>No Record Found.</p>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="mr-2" dangerouslySetInnerHTML={{__html:svg}} />
          </div>
          <div className="col">
            <h1 className="text-uppercase">{account.alias}</h1>
            <div>Address: {account.address}</div>
            <div>Deposit Asset balance: {this.props.depositAssetBalance || 0}</div>
            <div>Bill Asset Balance: {this.props.billAssetBalance || 0}</div>

            <hr/>
            <h4>History</h4>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="pills-home-tab" data-toggle="pill"
                   href="#pills-deposit" onClick={() => this.listBalance(account, GetContractArgs().assetDeposited)} role="tab" aria-controls="pills-deposit" aria-selected="true">Deposit Asset Record</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="pills-profile-tab" data-toggle="pill"
                   href="#pills-profit" onClick={() => this.listBalance(account, GetContractArgs().assetBill)} role="tab" aria-controls="pills-profit" aria-selected="false">Bill Asset Record</a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-deposit" role="tabpanel" aria-labelledby="pills-deposit-tab">
                {record}
              </div>
              <div className="tab-pane fade" id="pills-profit" role="tabpanel" aria-labelledby="pills-profit-tab">
                {record}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  depositAssetBalance: state.depositAssetBalance,
  billAssetBalance: state.billAssetBalance,
  bytom: state.bytom
})

const mapDispatchToProps = dispatch => ({
  updateBalances: (guid) => dispatch(action.updateBalances(guid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
