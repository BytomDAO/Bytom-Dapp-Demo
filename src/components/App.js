import React, { Component } from "react";
import '../styles/App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import  Profit  from './layout/profit'
import Saving from './layout/save'
import Footer from './layout/footer'
import Header from './layout/header'
import Account from './layout/account'
import action from './action'
import bytomWrap from './layout/bytomWrap'
import {connect} from "react-redux";

import GetContractArgs from "./constants";
import Bytom from 'bytom-js-sdk'

class App extends Component {
  componentDidMount(){
    const { bytom, setBytom } = this.props;
    if(!bytom){
      document.addEventListener('chromeBytomLoaded', bytomExtension => {
        console.log('bytomloaded');
        const bytom = window.bytom;
        setBytom(bytom);
        this.bytomLoaded(bytom);
      });
    }else {
      this.bytomLoaded(bytom);
    }
  }

  bytomLoaded (bytom){
    let bytomPollInterval = 3 * 1000;
    let networks = {
      solonet: 'http://app.bycoin.io:3000/',
      testnet: 'http://app.bycoin.io:3020/',
      mainnet: 'https://api.bycoin.im:8000/'
    };

    try {
      const BYTOM_ACCOUNT = bytom.default_account

      const bytomAPI = new Bytom(networks, '')
      bytomAPI.setNetType(bytom.net)

      global.bytomAPI = bytomAPI

      // Check to see if the user has signed in/out of their
      // bytom wallet or switched accounts
      let accountInterval = setInterval(function () {
        if (BYTOM_ACCOUNT.accountId !== bytom.default_account.accountId) {
          location.reload(true);
        }
      }, bytomPollInterval);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return  (
      <div>
        <Header />
        <Constants />
        <section className="portfolio" id="portfolio">
          <div className="container">
            <Main />
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

const Constants = () =>(
  <header className="masthead bg-primary text-white">
    <div className="container">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="mr-5">Deposit Asset ID: </span>
            </td>
            <td>{GetContractArgs().assetDeposited}</td>
          </tr>
          <tr>
            <td>
              <span className="mr-5">Bill Asset ID: </span>
            </td>
            <td>{GetContractArgs().assetBill}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={bytomWrap(Saving)}/>
    <Route exact path='/profit' component={bytomWrap(Profit)}/>
    <Route exact path='/account' component={bytomWrap(Account)}/>
  </Switch>
);


const mapStateToProps = state => ({
  bytom: state.bytom,
})

const mapDispatchToProps = dispatch => ({
  setBytom: (bytom) => dispatch(action.setBytom(bytom)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))