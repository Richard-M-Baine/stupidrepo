// LocationSelector.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Initial center (e.g., center of the continental USA)
const initialCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

const LocationSelector = ({ setLatitude, setLongitude }) => {
  const [markerPosition, setMarkerPosition] = useState(initialCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure you have this set
  });

  const onMarkerDragEnd = useCallback((e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
  }, [setLatitude, setLongitude]);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={5}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
      />
    </GoogleMap>
  );
};

export default LocationSelector;
