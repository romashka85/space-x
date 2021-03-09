import React from 'react'
import {  Switch, Route } from "react-router-dom";

import LaunchList from './components/launch-list/launch-list';
import Header from './components/header/header';
import LaunchDetail from './components/launch-detail/launch-detail';

import './App.css';

const App: React.FC = () => {

  return (
    <div className="App">
        <Header />        
          <Switch>
            <Route exact path='/space-x/' component={LaunchList}/>
            <Route path="/launch/:id" component={LaunchDetail}/>
          </Switch>  
    </div>
  )
}

export default App;
