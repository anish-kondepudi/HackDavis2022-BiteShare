import React from 'react';
import Navigation from './components/Navigation';
import './App.css';
import { Home, About, Login, Register, DonateGive, DonateView, PickupMap, PickupList } from './pages';

const App = () => {
  return (
    <div className="App">
      <Navigation/>
      <Home/>
    </div>
  );
}

export default App;
