import React from 'react';
import logo from './images/logo.png'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector } from 'react-redux';

const Navigation = () => {

  const userEmail = useSelector(state => state.email);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={logo} width="50" height="30" className="d-inline-block align-top" alt=""/>
      <a className="navbar-brand" href="#">Bite Share</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {userEmail ? <>
            <NavDropdown title="Donations" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">New Donation</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">My Donations</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pick Up" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">See map</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">See List</NavDropdown.Item>
              </NavDropdown></> : ''
          }
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end mr-5">
        <ul className="navbar-nav mr-auto">
          {userEmail ?<>
            <li className="nav-item">
              <a className="nav-link" href="#">Logout</a>
            </li></> :
             <><li className="nav-item">
             <a className="nav-link" href="#">Login</a>
           </li>
           <li className="nav-item">
             <a className="nav-link" href="#">Register</a>
           </li></>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
