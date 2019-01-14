import React, { Component } from "react";
import '../styles/App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import  Profit  from './layout/profit'
import Saving from './layout/save'

const App = () => (
  <div className='app'>
    <h1>Bytom Dapp demo</h1>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Saving</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/profit'>Profit</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Saving}></Route>
    <Route exact path='/profit' component={Profit}></Route>
  </Switch>
);

export default App;