import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RequestCard from './RequestCard/index.js'
import './allRequests.css'


import { fetchAPIKeyThunk } from '../../../store/maps.js'
import { fetchAllRequestsThunk } from '../../../store/requests.js'


import RequestMapStuff from '../../Maps/RequestMap/index.js'

function AllRequests() {
    const dispatch = useDispatch();
    const apiKey = useSelector(state => state?.maps?.key); // Fetch API Key here

    const requests = useSelector(state => state?.requests ?? {});
   

  

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchAllRequestsThunk())
            .then(() => dispatch(fetchAPIKeyThunk())) // Fetch API key in parent
            .then(() => setLoaded(true));
    }, [dispatch]);

    const requestList = requests ? Object.values(requests) : [];
    console.log(requestList)


    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }

    return (
        <div className='mainAllGroups'>
            <div className='groupAllPart'>
                <div className='groupAllTextDiv'>
                    <h1>Nearby Requests</h1>
                </div>
                <div className='secondaryGroupAllDiv'>
                    <div className='groupsAllPart'>
                        {requestList.map(request => (
                            <RequestCard request={request} key={request.id} />
                        ))}
                    </div>
                    <div className='mapContainerMain'>
                        {/* Pass API key down as prop */}
                        <RequestMapStuff apiKey={apiKey} locations={requestList} />

                    </div>
                </div>
            </div>
        </div>
    );
}


export default AllRequests;