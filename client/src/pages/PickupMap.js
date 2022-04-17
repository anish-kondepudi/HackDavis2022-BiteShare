import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  marker,
  InfoWindow,
} from '@react-google-maps/api';


const PickupMap = (props) => {

  const [lat, setLat] = useState(37.430759);
  const [lng, setLng] = useState(-121.897507);

  console.log(lat, lng);

  useEffect(() => {
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