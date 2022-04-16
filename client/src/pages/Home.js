import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setEmail } from '../actions';


const Home = () => {

  const userEmail = useSelector(state => state.email);
  const dispatch = useDispatch();
  
  return (
    <div className="Home">
      This is the homepage. Mock being logged in or logged out using buttons below.
      <br/>
      <button onClick={() => {dispatch(setEmail("anish@gmail.com"))}}>login</button>
      <button onClick={() => {dispatch(setEmail(""))}}>logout</button>
    </div>
  );
}

export default Home;