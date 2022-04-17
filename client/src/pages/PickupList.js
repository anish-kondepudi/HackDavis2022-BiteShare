import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Popup from "./Popup";
import './styles/PickupList.css'

const PickupList = () => {
  const [allFood, setAllFood] = useState([]);
  const userEmail = useSelector(state => state.email);
  const [showPopUp, setShowPopup] = useState(false);
  const [popupCurrImgData, setPopupCurrImgData] = useState();
  const [popupCurrName, setPopupCurrName] = useState();
  const [popupCurrEmail, setPopupCurrEmail] = useState();
  const [popupCurrId, setPopupCurrId] = useState();
  const [popupCurrDesc, setPopupCurrDesc] = useState();
  const [messageSent, setTextMessageSent] = useState(false);


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
    if(messageSent) {
      window.location.reload();
    }
    setShowPopup(false);
    setTextMessageSent(false);
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
    // two emails -> food email, and user curr email
    // need to get the phone number of both
    fetch("http://localhost:5000/users/" + userEmail).then(res => res.json()).then(currUserData => {
      fetch("http://localhost:5000/users/" + popupCurrEmail).then(res => res.json()).then(popupUserData => {
        let userPhoneNumber = currUserData[0]["phoneNumber"];
        let donorPhoneNumber = popupUserData[0]["phoneNumber"];
        let donorAddress = popupUserData[0]["address"];
        fetch("http://localhost:5000/pickup/" + popupCurrId, {
          method: 'PUT', 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
           },
          body: JSON.stringify({donorPhoneNumber: donorPhoneNumber, userPhoneNumber: userPhoneNumber, donorAddress: donorAddress})}).then(res => res.json()).then(data => {
            setTextMessageSent(true);
          })
      })
    })
  }

  return (
    <div className="PickupList">
      <div className="DonateView">
      {allFood.map((indFood) => (
        <div className="post_wrapper" key={indFood.id}>
          <div class="header_wrapper">
            <img src={indFood.imgData} className="header_img" />
          </div>
          <div className="content_text">
            <p className="title">{indFood.name}</p>
            <p className="txt">{indFood.desc}</p>
            <div className="line_separator" ></div>
            <div className="tile_footer">
              <div className="date">From: {indFood.email}</div>
              <a href="#" onClick={() => {cardClicked(indFood)}} className="pull-right readmore">Pick Up</a>
            </div>
          </div>
        </div>
      ))}

      {showPopUp && <Popup content={
        <>
        <div className="post_wrapper" key={popupCurrId}>
          <div class="header_wrapper">
            <img src={popupCurrImgData} className="header_img" />
          </div>
          <div className="content_text">
            <p className="title">{popupCurrName}</p>
            <p className="txt">{popupCurrDesc}</p>
            <div className="line_separator" ></div>
            <div className="tile_footer">
              <div className="date">From: {popupCurrEmail}</div>
              <a href="#" onClick={() => {getFoodClicked()}} className="pull-right readmore">Pick Up</a>
            </div>
            <div className="line_separator" ></div>
            {messageSent && <div className="date"> You have reserved this food! Check you text messages to get the address! </div>}
          </div>
        </div>
        </>
        } handleClose={handlePopupClose} ></Popup>}
      
    </div>
    </div>
  );
}

export default PickupList;