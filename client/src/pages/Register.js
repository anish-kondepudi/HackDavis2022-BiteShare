import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/Register.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail as setReduxStoreEmail } from '../actions';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    const requestParams= {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
      username,
      email,
      password,
      address,
      phoneNumber
      })
    };
    let url = 'http://localhost:5000/addUser/';
    fetch(url, requestParams).then(res => {
      console.log("Res ok: " + res.ok)
      if(!res.ok){
        throw res;
      }
      return res.json();
    }).then(data => {
      console.log("Post data: " + data["_id"]);
      dispatch(setReduxStoreEmail(email));
      window.location.href = "/http://localhost:3000/";
    });
};
  return (
    <div className="Register">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" onChange={handleUsernameChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="address" placeholder="Enter Address" onChange={handleAddressChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="phoneNumber" placeholder="Enter Phone Number" onChange={handlePhoneNumberChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" onChange={handleEmailChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;