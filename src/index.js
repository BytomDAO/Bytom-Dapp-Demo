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

require("babel-core/register");
require("babel-polyfill");

ReactDOM.render((
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));




