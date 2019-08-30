import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import SignUp from './components/auth/SignUp'
import PokemonList from './components/pokemon/pokemon-list'
import Profile from './components/pokemon/profile'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">

            <Switch>
              <Route exact path='/'component={SignUp} />
              <Route exact path='/pokemon-list'component={PokemonList} />
              <Route exact path='/profile'component={Profile} />

            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
