import React, { useState, useEffect, useMemo  } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";






import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {fetchAPIKeyThunk} from '../../../store/maps'
import './groupMapDetails.css'




// Ryan Login Modal

function GroupMapDetails() {
  
  

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
  const locations = useSelector(state =>state?.locations)
  

  // {locationList.map(location => (
    //<Marker position={useMemo(() => ({ lat: location?.lat, lng: location?.}), [])} />
    //))}
  
  let { isLoaded } = useLoadScript({
    googleMapsApiKey: keyy,
    libraries: ['places'],
  });

 // the markers are what you want

// groups
 const groupDetail = useMemo(() => ({ lat: locations[charityId]?.lat, lng: locations[charityId]?.lng}), []);
 const options = useMemo(() => ({ disableDefaultUI: false, clickableIcons: true}), []);
   
  return isLoaded &&(
    
    <GoogleMap zoom={10} center={groupDetail} mapContainerClassName="mapContainerMain" options={options}>
    <Marker position={groupDetail} />
  </GoogleMap>
)
}

export default GroupMapDetails;