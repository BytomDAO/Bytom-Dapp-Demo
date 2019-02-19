import React, { Component } from "react";
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom';
import  Profit  from './layout/profit'
import Saving from './layout/save'
import Footer from './layout/footer'
import Header from './layout/header'
import Account from './layout/account'
import bytomWrap from './layout/bytomWrap'


import GetContractArgs from "./constants";

const App = () => (
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
);

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

export default App;
