 
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail } from '../actions';
import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [email, setEmail2] = useState("");
  const [password, setPassword] = useState("");
 
  const handleEmailChange = (event) => {
    setEmail2(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
 
  const handleSubmit = (event) => {
    const requestParams= {
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
    let url = 'http://localhost:5000/users/' + email;
    fetch(url).then(res => {
      if(!res.ok){
        throw res;
      }
      return res.json();
    }).then(data => {
      if(password===data[0]["password"]){
        dispatch(setEmail(email));
        navigate("/");
      }
    });
};
 
  return (
    <div className="Login">
     <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Login;
