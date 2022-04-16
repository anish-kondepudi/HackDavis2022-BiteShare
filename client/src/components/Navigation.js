import React from 'react';
import logo from './images/logo.png'
<<<<<<< HEAD
import { useSelector } from 'react-redux';

const Navigation = () => {

  const userEmail = useSelector(state => state.email);

=======

const Navigation = () => {
>>>>>>> c3f2041 (Added Static Navbar)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={logo} width="50" height="30" className="d-inline-block align-top" alt=""/>
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
<<<<<<< HEAD
          {userEmail ? <>
            <li className="nav-item">
              <a className="nav-link" href="#">Donate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pick Up</a>
            </li></> : ''
          }
=======
          <li className="nav-item">
            <a className="nav-link" href="#">Donate</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pick Up</a>
          </li>
>>>>>>> c3f2041 (Added Static Navbar)
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end mr-5">
        <ul className="navbar-nav mr-auto">
<<<<<<< HEAD
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
=======
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Register</a>
          </li>
>>>>>>> c3f2041 (Added Static Navbar)
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
