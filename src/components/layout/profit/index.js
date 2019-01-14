import React from 'react'

const Profit = () => (
  <div>
    <h2>Profit</h2>
    <form>
      <div className="form-group">
        <label for="exampleInputAmount">Amount</label>
        <input type="amount" className="form-control" id="exampleInputAmount"placeholder="Amount Profit"/>
      </div>
      <div className="form-group">
        <label for="exampleInputAddress">Address</label>
        <input type="address" className="form-control" id="exampleInputAddress" placeholder="Address"/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
)

export default Profit