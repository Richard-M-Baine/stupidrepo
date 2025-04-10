import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllLocationsThunk } from '../../../../store/locations.js'

import './groupCard.css'

function CharityCard({ group }) {
    
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    const locations = useSelector(statee => statee?.locations ?? {})

    const rightLocationId = group.locationID

    const charityLocation = locations[rightLocationId]


    useEffect(() => {
        dispatch(fetchAllLocationsThunk())
            .then(() => setLoaded(true))
    }, [dispatch])

   

    return loaded && (
        <NavLink className='navGroupCardAllGroups' to={`/groups/${group.id}`}>

            <h1 className='navGroupCardName'>{group.name}</h1>
            <h2 className='navGroupCardAbout'>{group.purpose}</h2>
            <h3 className='navGroupCardAddress'>{charityLocation?.address || "Unknown Address"}</h3>
            <h3 className='navGroupCardCity'>{charityLocation?.city || "Unknown City"} {charityLocation?.state || "Unknown State"}</h3>








        </NavLink>


    )
}


export default CharityCard