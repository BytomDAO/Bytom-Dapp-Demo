import React from 'react'
import { FixedLimitDeposit } from './action'
import { dueBlockHeight } from '../../constants'

export default class Save extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      address: ''
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
    const address = event.target.address.value

    FixedLimitDeposit(amount, address)
  }

  render() {
    return (
      <div>
        <h2>Deposit</h2>
        <div className="mt-3 mb-4">
          <p className='lead'>Deposit should happened under the block height {dueBlockHeight}.</p>
          <p className='lead' >Spend {this.state.amount} Deposit Asset from your account {this.state.address} and you will get the relevant {this.state.amount} Bill Asset.</p>
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
