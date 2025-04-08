import React from 'react'
import { useEffect, useState } from 'react';


import CreateRequestMessageModal from '../../Messages/receivedMessageModal'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RequestMapStuff from '../../Maps/GroupMap/index.js'

import { fetchAPIKeyThunk } from '../../../store/maps.js'
import { getOneRequestThunk } from '../../../store/requests';


import './requestDetails.css'


export default function RequestDetails() {

    const dispatch = useDispatch();
    const apiKey = useSelector(state => state?.maps?.key)
    const { id } = useParams();
     const requests = useSelector(state => state?.requests ?? {});


    const requestId = parseInt(id)
    const request = useSelector(state => state?.requests?.[requestId]);



    const [loaded, setLoaded] = useState(false)


    function formatTime(timeStr) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York'
        };
        return new Date(timeStr).toLocaleString('en-US', options);
    }




    useEffect(() => {
        dispatch(getOneRequestThunk(id))
            .then(() => dispatch(getOneRequestThunk(id)))
            .then(() => dispatch(fetchAPIKeyThunk()))
            .then(() => setLoaded(true));
    }, [dispatch, id])  // ← Add id so it know when change!


    
    const requestList = requests ? Object.values(requests) : [];
    console.log(requestList)




    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }






    return (
        <div className='groupdetailsoutmostDiv'>
         
         <h1> {request.title}</h1>

         <h2>{request.userName}</h2>
         <h3>synopsis</h3>
         <p>{request.details}</p>

         <h3>start time {formatTime(request.startTime)}</h3>
         <h3>end time {formatTime(request.endTime)}</h3>
        <h2>address</h2>
         <h3>{request.address}  </h3>
         <h3>{request.city} {request.state} {request.postalCode}</h3>
         <div className='requestDetailsOfferHelpModal'><CreateRequestMessageModal /></div>
            <div className='mapContainerMain'>
                {/* Pass API key down as prop */}
                <RequestMapStuff apiKey={apiKey} locations={requestList} />

            </div>
        </div>




    )


}