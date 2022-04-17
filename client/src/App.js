import React from 'react';
import Navigation from './components/Navigation';
import './App.css';
import { Home, About, Login, Register, DonateGive, DonateView, PickupMap, PickupList } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <div id="transition-block">
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/donate/give' element={<DonateGive />} />
            <Route path='/donate/view' element={<DonateView />} />
            <Route path='/pickup/map' element={<PickupMap />} />
            <Route path='/pickup/list' element={<PickupList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
