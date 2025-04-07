

import React from 'react'
import { useEffect, useState } from 'react';

import CreateGroupMessageModal from '../../Messages/groupMessageModal'

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import GroupMapDetails from '../../Maps/GroupMap/index.js'

import { fetchAPIKeyThunk } from '../../../store/maps.js'
import { getOneGroupThunk } from '../../../store/groups';
import { getOneLocationThunk } from '../../../store/locations'

import './groupDetails.css'


export default function CharityDetails() {
    const dispatch = useDispatch();
    const apiKey = useSelector(state => state?.maps?.key)
    const { id } = useParams();

    const charityId = parseInt(id)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneGroupThunk(id))
            .then(() => dispatch(getOneLocationThunk(id)))
            .then(() => dispatch(fetchAPIKeyThunk()))
            .then(() => setLoaded(true));
    }, [dispatch, id])

    const group = useSelector(state => state?.group?.[charityId] ?? {});

    const location = useSelector(state => state?.locations?.[charityId] ?? {});
    const locationsList = location ? [location] : []; // Changed this line

    console.log('locationsList in CharityDetails: ', locationsList);
    console.log(group, location)

    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }

    console.log('i am locationlist ',locationsList)
    return (
        <div className='groupdetailsoutmostDiv'>
            <h1>All about {group.name}</h1>
            <h2>purpose {group.purpose}</h2>
            <p>{group.about}</p>
            <p>last updated {group.updatedAt}</p>

            <h2>located at</h2>
            <h3>{location.address}</h3>
            <h3>{location.city} {location.state} {location.postalCode}</h3>

            <div className='mapContainerMain'>
                {/* Pass API key down as prop */}
                <GroupMapDetails apiKey={apiKey} locations={locationsList} />
            </div>
        </div>
    )
}