import React from 'react';
import Navigation from './components/Navigation';
import './App.css';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">
      <Navigation/>
      <Login/>
    </div>
  );
}

export default App;
