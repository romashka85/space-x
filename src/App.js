import React from 'react'
import {  Switch, Route, Link } from "react-router-dom";

import LaunchList from './components/launch-list/launch-list';
import Header from './components/header/header';
import LaunchDetail from './components/launch-detail/launch-detail';

import './App.css';

const App = () => {

  return (
    <div className="App">
        <Header />        
          <Switch>
            <Route exact path='/' component={LaunchList}/>
            <Route path="/launch/:id" component={LaunchDetail}/>
          </Switch>  
    </div>
  )
}

export default App;
