import React, { useState, useEffect, useMemo, useRef, useCallback  } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";








import { useDispatch, useSelector } from 'react-redux';


import {fetchAPIKeyThunk} from '../../../store/maps'
import './mapStuff.css'




function MapStuff() {
  

  const keyy = useSelector(state => state?.maps?.key)
  const [loaded , setLoaded] = useState(false)
  const [stateKey, setStateKey] = useState('')
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAPIKeyThunk()).then(() => setLoaded(true));
  }, [dispatch]);
  
  useEffect(() => {
    if (keyy) {
      setStateKey(keyy);
    }
  }, [keyy]); // Run when keyy updates
  

  const locations = useSelector(state =>state?.locations)
  const locationList = Object.values(locations)

 
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: stateKey || "", // Only pass when stateKey is set
    libraries: ['places'],
  });
  


 const center = useMemo(() => ({ lat: 40.05047, lng: -74.12218}), []);
 const secondCenter = useMemo(() => ({ lat: 40.09506, lng: -74.215173
 }), []);
 const thirdCenter = useMemo(() => ({ lat: 40.007864, lng: -74.147209 
 }), []);
 const options = useMemo(() => ({ disableDefaultUI: false, clickableIcons: true}), []);
   
  return isLoaded &&(
    
    <GoogleMap zoom={10} center={center} mapContainerClassName="mapContainerMain" options={options}>
    <Marker position={center} />
    <Marker position={secondCenter} />
    <Marker position={thirdCenter} />
  </GoogleMap>
)
}

export default MapStuff;