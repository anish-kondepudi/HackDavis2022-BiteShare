import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  marker,
  InfoWindow,
} from '@react-google-maps/api';


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
    console.log("hiii");
    let url = 'http://localhost:5000/food/';
    fetch(url).then(res => {
      if(!res.ok){
        console.log(res);
        // throw res;
      }
      return res.json();
    }).then(data => {
      console.log(data);
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
    <div className='PickupMap'>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
      >
      </GoogleMap>
    </div>
  );
};

export default PickupMap;