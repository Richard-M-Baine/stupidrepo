import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CharityCard from './GroupCard/index.js'
import './allGroups.css'


import { fetchAPIKeyThunk } from '../../../store/maps.js'
import { fetchAllGroupsThunk } from '../../../store/groups.js'
import { fetchAllLocationsThunk } from '../../../store/locations.js'

import MapStuff from '../../Maps/GroupMap/index.js'

function AllCharities() {
    const dispatch = useDispatch();
    const apiKey = useSelector(state => state?.maps?.key); // Fetch API Key here

    const groups = useSelector(state => state?.groups ?? {});
    const locations = useSelector(state => state?.locations ?? {});

  

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchAllGroupsThunk())
            .then(() => dispatch(fetchAllLocationsThunk()))
            .then(() => dispatch(fetchAPIKeyThunk())) // Fetch API key in parent
            .then(() => setLoaded(true));
    }, [dispatch]);

    const groupsList = groups ? Object.values(groups) : [];
    console.log(groupsList)
    const locationsList = locations ? Object.values(locations) : [];

    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }

    return (
        <div className='mainAllGroups'>
            <div className='groupAllPart'>
                <div className='groupAllTextDiv'>
                    <h1>Nearby Organizations</h1>
                </div>
                <div className='secondaryGroupAllDiv'>
                    <div className='groupsAllPart'>
                        {groupsList.map(group => (
                            <CharityCard group={group} key={group.id} />
                        ))}
                    </div>
                    <div className='mapContainerMain'>
                        {/* Pass API key down as prop */}
                        <MapStuff apiKey={apiKey} locations={locationsList} />

                    </div>
                </div>
            </div>
        </div>
    );
}


export default AllCharities;