import React, { useState, useEffect } from 'react';
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
  //const userEmail = useSelector(state => state.email);

  useEffect(() => {
    fetch('http://localhost:5000/food/hello@gmail.com').then(res => res.json()).then(data => {
      console.log("Data length after get: " + data.length)
      let indImages = []
      for(let i = 0; i < data.length; i++) {
        indImages.push({imgData: data[i].data, name: data[i].name, desc: data[i].description});
        //document.getElementById("something").src = data[i].data;
      }
      console.log("Image list: " + indImages);
      setAllUsersData(indImages);
    });
  }, []);
  return (
    <div className="DonateView">
      {allUsersData.map((allUsersData) => 
        <div class = "individualCard">
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <img src={allUsersData.imgData} id = "usersFood"></img>
          <Card.Title>{allUsersData.name}</Card.Title>
          <Card.Text>
            {allUsersData.desc}
          </Card.Text>
        </Card.Body>
        </Card>
        </div>
      )}
      
    </div>
  );
}

export default DonateView;