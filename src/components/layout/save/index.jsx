import React from 'react'
import { FixedLimitDeposit} from './action'
import { dueBlockHeight, gas } from '../../constants'
import {connect} from "react-redux";

class Save extends React.Component {

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
    const account = this.props.account
    const address = account.address

    FixedLimitDeposit(account, amount, address)
      .then(()=> {
          this.setState({
            error:'',
            msg:`Submit success!!! you spent ${amount} deposite asset,and gain ${amount} bill asset.`
          })
        }).catch(err => {
          this.setState({
            error:err,
            msg: ''
          })
        })
  }

  render() {
    return (
      <div>
        <h2>Deposit</h2>
        <div className="mt-3 mb-4">
          <p className='lead'>Deposit should happen under the block height {dueBlockHeight}.</p>
          <p className='lead' >Spend {this.state.amount} Deposit Asset from your current chrome extension account <b className="font-weight-bolder text-uppercase">{this.props.account.alias}</b> and you will get the relevant {this.state.amount} Bill Asset.</p>
          <p>Please make sure that your account has enough Deposit Asset.</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Deposit Asset Amount</label>
            <input
              type="amount"
              className="form-control"
              placeholder="Amount Saving"
              name="amount"
              value={this.state.amount}
              onChange={this.handleInputChange} />
          </div>
          <p>Fee:  {gas} BTM</p>
          <button type="submit" className="btn btn-primary">Spend Asset</button>

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

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps)(Save)
