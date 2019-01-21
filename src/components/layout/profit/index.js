import React from 'react'
import { FixedLimitProfit } from './action'

export default class Profit extends React.Component {

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

    FixedLimitProfit(amount, address)
  }

  render() {
    return (
      <div>
        <h2>Profit</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
