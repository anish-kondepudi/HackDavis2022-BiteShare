import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';
import Geocode from "react-geocode";
import './styles/PickupMap.css';

const PickupMap = (props) => {

  const [markers, setMarkers ] = useState([]);
  const [selected, setSelected] = useState(null);

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
                    "name": record.username
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
                const foodData = {"lat": lat, "lng": lng, "address": value.address, "id": value.id, "name": value.name}
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
            <p>{selected.name}</p>
            <p>{selected.address}</p>
            <p>{selected.id}</p>
          </div>
        </InfoWindow> : null}
      </GoogleMap>
    </div>
    </>
  );
};

export default PickupMap;