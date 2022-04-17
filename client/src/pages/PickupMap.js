import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  marker,
  InfoWindow,
} from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBTVIJwaV2ppI-Cb6H8NMfG3ALh0NztJfQ");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();



const PickupMap = (props) => {

  const [markers, setMarkers ] = useState([]);

  // Hard Coding 750 Orchard Rd, Davis, CA 95616
  const [lat, setLat] = useState(38.543770);
  const [lng, setLng] = useState(-121.761660);

  // Fetch Live Location and Update Lat & Lng
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

    // Grab Location Markers
    
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
                    "id": id
                  });
                })
              });
            }));
            return emailMap;
        }
      }
      //return emailMap
    }).then(emailMap => {
      const listOfFoods = [];
      Promise.all(emailMap).then(res => {
        for(let i = 0; i < res.length; i++) {
          res[i][0].then(value => {
            Geocode.fromAddress(value.address).then(
              (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const foodData = {"lat": lat, "lng": lng, "address": value.address, "id": value.id}
                setMarkers((current) => [
                  ...current,
                  foodData,
                ]);
                console.log("lol");
                console.log(markers);
                console.log("lel");
              },
              (error) => {
                console.error(error);
              }
            );
          })
        }


        // console.log("listofFoodes: ");
        // console.log(listOfFoods[0]);
        // console.log("done");
      });
    });
  }, []);

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
        zoom={13}
        center={center}
        options={options}
      >
      </GoogleMap>
    </div>
    </>
  );
};

export default PickupMap;