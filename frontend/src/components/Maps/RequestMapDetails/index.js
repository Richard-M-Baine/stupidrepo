import React, { useState, useEffect, useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";






import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {fetchAPIKeyThunk} from '../../../store/maps'
import './requestMapDetails.css'



function RequestMapDetails() {
  
  

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

  const { id } = useParams();
  const charityId = parseInt(id)
  const requests = useSelector(state =>state?.requests)

  // {locationList.map(location => (
    //<Marker position={useMemo(() => ({ lat: location?.lat, lng: location?.}), [])} />
    //))}
  
  let { isLoaded } = useLoadScript({
    googleMapsApiKey: keyy,
    libraries: ['places'],
  });

 // the markers are what you want

// groups
const requestsDetail = useMemo(() => ({ lat: requests[charityId]?.lat, lng: requests[charityId]?.lng}), []);
 
 const options = useMemo(() => ({ disableDefaultUI: false, clickableIcons: true}), []);
   
  return isLoaded &&(
    
    <GoogleMap zoom={10} center={requestsDetail} mapContainerClassName="mapContainerMain" options={options}>
    <Marker position={requestsDetail} />

  </GoogleMap>
)
}

export default RequestMapDetails;