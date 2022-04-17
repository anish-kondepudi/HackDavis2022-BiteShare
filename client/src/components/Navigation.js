import React from 'react';
import logo from './images/logo.png'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../actions';

const Navigation = () => {

  const userEmail = useSelector(state => state.email);
  const dispath = useDispatch();

  const onLogout = async () => {
    await new Promise(r => setTimeout(r, 1)); // sleep 1 ms before logging out
    dispath(setEmail(''));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light color-nav">
      <a href="/"><img src={logo} width="50" height="30" className="d-inline-block align-top" alt=""/></a>
      <a className="navbar-brand" href="/">Bite Share</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {userEmail ? <>
            <NavDropdown title="Donations" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1" href="/donate/give">New Donations</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" href="/donate/view">My Donations</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pick Up" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1" href="/pickup/map">See map</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" href="/pickup/list">See List</NavDropdown.Item>
              </NavDropdown></> : ''
          }
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end mr-5">
        <ul className="navbar-nav mr-auto">
          {userEmail ? <>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={() => {onLogout()}}>Logout</a>
            </li></> :
            <><li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
           </li>
           <li className="nav-item">
             <a className="nav-link" href="/register">Register</a>
           </li></>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
