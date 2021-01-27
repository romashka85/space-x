import React, {useState, useEffect} from 'react'

import CardList from './components/card-list/card-list';
import './App.css';

const App = () => {
const [launches, setLaunches] = useState([]);

useEffect(() => {
  const fetchFunc = async () => {
    const response = await fetch(`https://api.spacexdata.com/v3/launches`);
    const resJson = await response.json();
    setLaunches(resJson);
  }
  fetchFunc();
}, [])

  return (
    <div className="App">
      <h1>Space-X Project</h1>      
      <CardList launches={launches}/>    
    </div>
  )
}

export default App;
