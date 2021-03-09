import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from "@apollo/client";
import client from './client/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App'; 

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>         
    </ApolloProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);


