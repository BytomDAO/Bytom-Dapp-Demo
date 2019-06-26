import React, { Component } from "react";
import '../styles/App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import  Profit  from './layout/profit'
import Saving from './layout/save'
import Footer from './layout/footer'
import Header from './layout/header'
import Account from './layout/account'
import Constants from './layout/constants'
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
        const bytom = window.bytom;
        setBytom(bytom);
        this.bytomLoaded(bytom);
      });
    }else {
      this.bytomLoaded(bytom);
    }
  }

  async bytomLoaded (bytom){
    let bytomPollInterval = 3 * 1000;
    let networks = {
      solonet: 'http://app.bycoin.io:3000/',
      testnet: 'http://app.bycoin.io:3020/',
      mainnet: 'https://api.bycoin.im:8000/'
    };

    try {
      const BYTOM_ACCOUNT = await bytom.enable()
      this.props.updateConnection(true)

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
        <Constants/>
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
  updateConnection: (bytomConnection) => dispatch(action.updateConnection(bytomConnection)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))