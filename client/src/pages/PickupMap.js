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
import FoodBankIcon from '../components/images/foodbank.png';

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

  const getIconUrl = (marker) => {
    const foodBanks = ['thepantry@asucd.ucdavis.edu', 'info@yolofoodbank.org', 'tbryant@sacramentofoodbank.org'];
    if (foodBanks.indexOf(marker.email) > -1) {
      return FoodBankIcon;
    } else {
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }
  }

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
    if(messageSent) {
      window.location.reload();
    }
    setShowPopup(false);
    setTextMessageSent(false);
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

  const cardClicked = (indFood) => {
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
    <><div className='PickupMap'>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
          {markers.map(marker => <Marker
            key={marker.id}
            position={{lat: marker.lat, lng: marker.lng }}
            icon={{
              url: getIconUrl(marker)
            }}
            onClick={() => {setSelected(marker)}}
          />)}
        {selected ? <InfoWindow
          position={{lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {setSelected(null)}}
        >
          <div className="post_wrapper" key={selected.id}>
            <div class="header_wrapper">
              <img src={selected.img} className="header_img" />
            </div>
            <div className="content_text">
              <p className="title">{selected.name}</p>
              <p className="txt">{selected.description}</p>
              <div className="line_separator" ></div>
              <div className="tile_footer">
                <div className="date">From: {selected.email}</div>
                <a href="#" onClick={() => {cardClicked(selected)}} className="pull-right readmore">Pick Up</a>
              </div>
            </div>
          </div>
        </InfoWindow> : null}
      </GoogleMap>
    </div>
    {showPopUp && <Popup content={
        <>
          <div className="post_wrapper" key={selected.id}>
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
              {messageSent && <div className="date"> You have reserved this food! Check your text messages to get the address! </div>}
            </div>
          </div>
          
        </>
        } handleClose={handlePopupClose} ></Popup>}
    </>
  );
};

export default PickupMap;