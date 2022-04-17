import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

const PickupList = () => {
  const [allFood, setAllFood] = useState([]);
  const userEmail = useSelector(state => state.email);

  useEffect(() => {
    fetch('http://localhost:5000/food').then(res => res.json()).then(data => {
      let indFood = []
      for(let key in data) {
        indFood.push({imgData: data[key].data, name: data[key].name, desc: data[key].description, email: data[key].email});
      }
      setAllFood(indFood);
    });

    // }}).then(data => {
    //   /*console.log("Data length after get: " + data.length);
    //   let indFood = []
    //   for(let i = 0; i < data.length; i++) {
    //     indFood.push({imgData: data[i].data, name: data[i].name, desc: data[i].description, email: data[i].email});
    //   }
    //   setAllFood(indFood);*/
    //   /*for(let key in data) {
    //     console.log("Key: " + key);
    //   }*/
    // });
  }, []);

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
        </Card.Body>
        </Card>
        </div>
      )}
      
    </div>
    </div>
  );
}

export default PickupList;