import React, { Component } from "react";
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom';
import  Profit  from './layout/profit'
import Saving from './layout/save'
import Footer from './layout/footer'
import Header from './layout/header'

import { assetDeposited, assetBill } from "./constants";

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
            <td>{assetDeposited}</td>
          </tr>
          <tr>
            <td>
              <span className="mr-5">Bill Asset ID: </span>
            </td>
            <td>{assetBill}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </header>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Saving}></Route>
    <Route exact path='/profit' component={Profit}></Route>
  </Switch>
);

export default App;
