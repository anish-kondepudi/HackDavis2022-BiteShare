import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./styles/DonateView.css";
import Card from 'react-bootstrap/Card';

function arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Int8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );

}

const DonateView = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const userEmail = useSelector(state => state.email);

  useEffect(() => {
    fetch('http://localhost:5000/food/email/' + userEmail).then(res => res.json()).then(data => {
      console.log("Data length after get: " + data.length)
      let indImages = []
      for(let i = 0; i < data.length; i++) {
        indImages.push({imgData: data[i].data, name: data[i].name, desc: data[i].description, pickedUp: data[i].status});
      }
      console.log("Image list: " + indImages);
      setAllUsersData(indImages);
    });
  }, []);
  return (
    <div className="DonateView">
      {allUsersData.map((indUserData, i) => 
        <div className="post_wrapper" key={i}>
          <div className="header_wrapper">
            <img src={indUserData.imgData} className="header_img" />
          </div>
          <div className="content_text">
            <p className="title">{indUserData.name}</p>
            <p className="txt">{indUserData.desc}</p>
            <div className="line_separator" ></div>
            {indUserData.pickedUp && <div className="date"> This has been picked up! </div>}
            {!indUserData.pickedUp && <div className="date"> This is still Available </div>}
          </div>
        </div>
      )}
      
    </div>
  );
}

export default DonateView;