import React from 'react'
import { FixedLimitProfit } from './action'
import GetContractArgs from "../../constants";
import BigNumber from 'bignumber.js'

class Profit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      address: '',
      msg:'',
      error:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (
      window.bytom
      && window.bytom.defaultAccount
    ) {
      this.setState({ account: window.bytom.defaultAccount })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const amount = Number(event.target.amount.value)
    const account = this.state.account
    const address = event.target.address.value

    FixedLimitProfit(account, amount, address)
      .then(()=> {
        this.setState({
          error:'',
          msg:`Submit success!!! you spent ${amount} bill asset, and gain ${BigNumber(amount).multipliedBy(GetContractArgs().radio).toNumber()} deposit asset.`
        })
      }).catch(err => {
      this.setState({
        error: err,
        msg:''
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Profit</h2>
        <div className="mt-3 mb-4">
          <p className='lead'>Profit should get above the block height {GetContractArgs().dueBlockHeight}.</p>
          <p className='lead'>Send {this.state.amount} Bill Asset from your chrome extension account <b className="font-weight-bolder text-uppercase">{this.state.account && this.state.account.alias}</b>, and the address {this.state.address} will gain {BigNumber(this.state.amount).multipliedBy(GetContractArgs().radio).toNumber() || ''} Deposit Asset.</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Bill Asset Amount</label>
            <input
              type="amount"
              className="form-control"
              placeholder="Amount Profit"
              name="amount"
              value={this.state.amount}
              onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label >Address</label>
            <input
              type="address"
              className="form-control"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange} />
          </div>
          <p>Fee:  {GetContractArgs().gas} BTM</p>
          <button type="submit" className="btn btn-primary">Profit to address</button>
          {this.state.msg && <div className="alert alert-success mt-4" role="alert">
            {this.state.msg}
          </div>}
          {this.state.error && <div className="alert alert-danger mt-4" role="alert">
            {this.state.error}
          </div>}
        </form>
      </div>
    )
  }
}

export default Profit
