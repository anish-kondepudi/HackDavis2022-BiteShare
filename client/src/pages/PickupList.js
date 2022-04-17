import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Popup from "./Popup";

const PickupList = () => {
  const [allFood, setAllFood] = useState([]);
  const userEmail = useSelector(state => state.email);
  const [showPopUp, setShowPopup] = useState(false);
  const [popupCurrImgData, setPopupCurrImgData] = useState();
  const [popupCurrName, setPopupCurrName] = useState();
  const [popupCurrEmail, setPopupCurrEmail] = useState();
  const [popupCurrId, setPopupCurrId] = useState();
  const [popupCurrDesc, setPopupCurrDesc] = useState();


  useEffect(() => {
    fetch('http://localhost:5000/food').then(res => res.json()).then(data => {
      let indFood = []
      for(let key in data) {
        console.log("Id: " + data[key]._id);
        indFood.push({imgData: data[key].data, name: data[key].name, desc: data[key].description, email: data[key].email, id: data[key]._id});
      }
      setAllFood(indFood);
    });
  }, []);

  const handlePopupClose = (event) => {
    setShowPopup(false);
  }

  const cardClicked = (indFood) => {
    setPopupCurrImgData(indFood.imgData)
    setPopupCurrName(indFood.name);
    setPopupCurrEmail(indFood.email);
    setPopupCurrId(indFood.id);
    setPopupCurrDesc(indFood.desc);
    setShowPopup(true)
  }

  const getFoodClicked = () => {
    console.log("Food id: " + popupCurrId)
    // two emails -> food email, and user curr email
    // need to get the phone number of both
    console.log("User email: " + userEmail);
    fetch("http://localhost:5000/users/" + userEmail).then(res => res.json()).then(currUserData => {
      fetch("http://localhost:5000/users/" + popupCurrEmail).then(res => res.json()).then(popupUserData => {
        let userPhoneNumber = currUserData[0]["phoneNumber"];
        let donorPhoneNumber = popupUserData[0]["phoneNumber"];
        let donorAddress = popupUserData[0]["address"];
        console.log("User phone number: " + userPhoneNumber);
        console.log("Donor phone number: " + donorPhoneNumber);
        console.log("Donor address: " + donorAddress);
        fetch("http://localhost:5000/pickup/" + popupCurrId, {
          method: 'PUT', 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({donorPhoneNumber: donorPhoneNumber, userPhoneNumber: userPhoneNumber, donorAddress: donorAddress})}).then(res => res.json()).then(data => {
            console.log(data);
          })
      })
    })

    /*
    fetch("http://localhost:5000/pickup/" + popupCurrId, {
        method: 'PUT', 
        body: JSON.stringify({
        donorPhoneNumber: 
      })
    }).then(res => res.json()).then(data => {
      console.log("Data: " + data);
    })*/
  }

  return (
    <div className="PickupList">
      <div className="DonateView">
      {allFood.map((indFood) => 
        <div class = "individualCard">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <img src={indFood.imgData} id = "usersFood"></img>
          <Card.Title>{indFood.name}</Card.Title>
          <Card.Text>
            Posted by: {indFood.email}
          </Card.Text>
          <Card.Text>
            {indFood.desc}
          </Card.Text>
          <Button onClick={() => cardClicked(indFood)} id = ""> I am interested </Button>
        </Card.Body>
        </Card>
        </div>
      )}

      {showPopUp && <Popup content={
        <>
          <img src={popupCurrImgData} id = "usersFood"></img>
          <h1> {popupCurrName} </h1>
          <p> Posted by: {popupCurrEmail} </p>
          <p> {popupCurrDesc} </p>
          <Button onClick={() => getFoodClicked()}> Reserve Food </Button>
        </>
        } handleClose={handlePopupClose} ></Popup>}
      
    </div>
    </div>
  );
}

export default PickupList;