import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllLocationsThunk } from '../../../../store/locations.js'

import './requestCard.css'

function RequestCard({ request }) {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    
    const walking = request.distance.toFixed(2)
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
        dispatch(fetchAllLocationsThunk())
            .then(() => setLoaded(true))
    }, [dispatch])

    return loaded && (
        <NavLink className='navGroupCardAllGroups' to={`/requests/${request.id}`}>

            <h1 className='navGroupCardName'>{request.title}</h1>
            <h2 className='navGroupCardAbout'>{formatTime(request.startTime)}</h2>

            <h3 className='navGroupCardAddress'>{request.address || "Unknown Address"}</h3>
            <h3 className='navGroupCardAbout'>Distance in miles {walking}</h3>
            <h3 className='navGroupCardCity'>{request.city || "Unknown City"} {request?.state || "Unknown State"}</h3>








        </NavLink>


    )
}


export default RequestCard