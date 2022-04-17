import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';
import Geocode from "react-geocode";
import './styles/PickupMap.css';
import Popup from "./Popup";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PickupMap = () => {

  const [markers, setMarkers ] = useState([]);
  const [selected, setSelected] = useState(null);

  const userEmail = useSelector(state => state.email);
  const [showPopUp, setShowPopup] = useState(false);
  const [popupCurrImgData, setPopupCurrImgData] = useState();
  const [popupCurrName, setPopupCurrName] = useState();
  const [popupCurrEmail, setPopupCurrEmail] = useState();
  const [popupCurrId, setPopupCurrId] = useState();
  const [popupCurrDesc, setPopupCurrDesc] = useState();

  const [messageSent, setTextMessageSent] = useState(false);
  // Hard Coding 750 Orchard Rd, Davis, CA 95616
  const [lat, setLat] = useState(38.543770);
  const [lng, setLng] = useState(-121.761660);

  // On Page Load
  useEffect(() => {
    // Fetch Live Location and Update Lat & Lng
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        console.error('Unable to retrieve your location');
      });
    }

    // Set Up Geocoder
    Geocode.setApiKey("AIzaSyBTVIJwaV2ppI-Cb6H8NMfG3ALh0NztJfQ");
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    // Fetch Location Markers
    let url = 'http://localhost:5000/food/';
    fetch(url).then(res => {
      if(!res.ok){
        throw res;
      }
      return res.json();
    }).then(data => {
      const emailMap = new Map();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            emailMap.set(new Promise((resolve) => {
              const id = data[key]._id;
              const description = data[key].description;
              const img = data[key].data;
              const name = data[key].name;
              const startTime = data[key].startTime;
              const endTime = data[key].endTime;
              let url = 'http://localhost:5000/users/' + data[key].email;
              fetch(url).then(res => {
                if(!res.ok){
                  throw res;
                }
                return res.json();
              }).then(data => {
                data.forEach((record, _) => {
                  resolve({
                    "address": record.address,
                    "id": id,
                    "username": record.username,
                    "description": description,
                    "img": img,
                    "name": name,
                    "startTime": startTime,
                    "endTime": endTime,
                    "number": record.phoneNumber,
                    "email": record.email
                  });
                })
              });
            }));
        }
      }
      return emailMap;
    }).then(emailMap => {
      Promise.all(emailMap).then(res => {
        for(let i = 0; i < res.length; i++) {
          res[i][0].then(value => {
            Geocode.fromAddress(value.address).then(
              (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const foodData = {
                  "lat": lat, 
                  "lng": lng, 
                  "address": value.address, 
                  "id": value.id,
                  "username": value.username,
                  "description": value.description,
                  "img": value.img,
                  "name": value.name,
                  "startTime": value.startTime,
                  "endTime": value.endTime,
                  "number": value.phoneNumber,
                  "email": value.email
                }
                setMarkers((current) => [
                  ...current,
                  foodData,
                ]);
              },
              (error) => {
                console.error(error);
              }
            );
          })
        }
      });
    });
  }, []);

  const handlePopupClose = (event) => {
    setShowPopup(false);
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

  const cardClicked = (indFood) => {
    console.log(indFood.img)
    console.log(indFood.name);
    console.log(indFood.email);
    console.log(indFood.id);
    console.log(indFood.description);


    setPopupCurrImgData(indFood.img)
    setPopupCurrName(indFood.name);
    setPopupCurrEmail(indFood.email);
    setPopupCurrId(indFood.id);
    setPopupCurrDesc(indFood.description);
    setShowPopup(true)
  }

  const libraries = ['places'];

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
  }

  const center = {
    lat: lat,
    lng: lng
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBTVIJwaV2ppI-Cb6H8NMfG3ALh0NztJfQ',
    libraries
  })

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
    <button onClick={()=> {
      console.log(markers);
    }}>thic boi</button>
    <div className='PickupMap'>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {markers.map(marker => <Marker
            key={marker.id}
            position={{lat: marker.lat, lng: marker.lng }}
            onClick={() => {setSelected(marker)}}
          />)}
        {selected ? <InfoWindow
          position={{lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {setSelected(null)}}
        >
          <div>
            <h2>Food Popup</h2>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <img src={selected.img} id = "usersFood"></img>
                <Card.Title>{selected.name}</Card.Title>
                <Card.Text>
                  Posted by: {selected.email}
                </Card.Text>
                <Card.Text>
                  {selected.description}
                </Card.Text>
                <Button onClick={() => cardClicked(selected)}> I am interested </Button>
              </Card.Body>
            </Card>
          </div>
        </InfoWindow> : null}
      </GoogleMap>
    </div>
    {showPopUp && <Popup content={
        <>
          <img src={popupCurrImgData} id="usersFood"></img>
          <h1> {popupCurrName} </h1>
          <p> Posted by: {popupCurrEmail} </p>
          <p> {popupCurrDesc} </p>
          <Button onClick={() => getFoodClicked()}> Reserve Food </Button>
        </>
        } handleClose={handlePopupClose} ></Popup>}
    </>
  );
};

export default PickupMap;