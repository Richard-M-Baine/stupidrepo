import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";






import { useDispatch, useSelector } from 'react-redux';


import {fetchAPIKeyThunk} from '../../../store/maps'
import './requestMap.css'




// Ryan Login Modal

function RequestMap() {
  
  

  const keyy = useSelector(state => state?.maps?.key)
  const [loaded , setLoaded] = useState(false)
  const [stateKey, setStateKey] = useState('')
  
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchAPIKeyThunk())
      .then(() => setLoaded(true))
      if (loaded){
        setStateKey(keyy)
      }

  }, [dispatch])

  const locations = useSelector(state =>state?.locations)
  const locationList = Object.values(locations)

  // {locationList.map(location => (
    //<Marker position={useMemo(() => ({ lat: location?.lat, lng: location?.}), [])} />
    //))}
  
  let { isLoaded } = useLoadScript({
    googleMapsApiKey: keyy,
    libraries: ['places'],
  });

 // the markers are what you want

// groups
 const request1 = useMemo(() => ({ lat: 40.122021, lng: -74.048737}), []);
 const request2 = useMemo(() => ({ lat: 40.304640, lng: -74.059740
 }), []);
 const request3 = useMemo(() => ({ lat: 40.049568, lng: -74.11982949999999
 }), []);
 const options = useMemo(() => ({ disableDefaultUI: false, clickableIcons: true}), []);
   
  return isLoaded &&(
    
    <GoogleMap zoom={10} center={request1} mapContainerClassName="mapContainerMain" options={options}>
    <Marker position={request1} />
    <Marker position={request2} />
    <Marker position={request3} />
  </GoogleMap>
)
}

export default RequestMap;