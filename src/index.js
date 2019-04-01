import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import "bootstrap/scss/bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import configureStore from "./store";

import Bytom from 'bytom-js-sdk'

require("babel-core/register");
require("babel-polyfill");

window.addEventListener('load', async function() {
  if (typeof window.bytom !== 'undefined') {
    let bytomPollInterval =  3 * 1000;

    let networks = {
      solonet: 'http://app.bycoin.io:3000/',
      testnet: 'http://app.bycoin.io:3020/',
      mainnet: 'https://api.bycoin.im:8000/'
    };

    try {
      window.bytom.defaultAccount = await window.bytom.request('currentAccount')

      const bytom = new Bytom(networks, '')
      bytom.setNetType(window.bytom.defaultAccount.net)

      global.bytomAPI = bytom

      // Check to see if the user has signed in/out of their
      // bytom wallet or switched accounts
      let accountInterval = setInterval(async function() {
        const account = await window.bytom.request('currentAccount')
        if ( account.guid !== window.bytom.defaultAccount.guid) {
          location.reload(true);
        }
      }, bytomPollInterval);
    } catch (err) {
      console.log(err);
    }

  }

  ReactDOM.render((
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
});




