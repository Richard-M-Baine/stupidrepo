import React from 'react'
import { useEffect, useState } from 'react';



import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MapStuff from '../../Maps/GroupMap/index.js'

import { fetchAPIKeyThunk } from '../../../store/maps.js'
import { getOneRequestThunk } from '../../../store/requests';


import './requestDetails.css'


export default function RequestDetails() {

    const dispatch = useDispatch();
    const apiKey = useSelector(state => state?.maps?.key)
    const { id } = useParams();



    const requestId = parseInt(id)




    const [loaded, setLoaded] = useState(false)







    useEffect(() => {
        dispatch(getOneRequestThunk(id))
            .then(() => dispatch(getOneRequestThunk(id)))
            .then(() => dispatch(fetchAPIKeyThunk()))
            .then(() => setLoaded(true));
    }, [dispatch, id])  // ← Add id so it know when change!


    const request = useSelector(state => state?.requests?.[requestId]);





    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }






    return (
        <div className='groupdetailsoutmostDiv'>
         
         <h1> {request.title}</h1>

         <h2>{request.userName}</h2>
         <h3>synopsis</h3>
         <p>{request.details}</p>

         <h3>start time {request.startTime}</h3>
         <h3>end time {request.endTime}</h3>
        <h2>address</h2>
         <h3>{request.address}  </h3>
         <h3>{request.city} {request.state} {request.postalCode}</h3>

            <div className='mapContainerMain'>
                {/* Pass API key down as prop */}
                <MapStuff apiKey={apiKey} locations={[]} />

            </div>
        </div>




    )


}