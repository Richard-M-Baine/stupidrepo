import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyCharityCard from './GroupCard/index.js';
import MyRequestsCard from './RequestCard/index.js';

import { fetchMyGroupsThunk } from '../../../store/groups.js';
import { fetchMyRequestsThunk } from '../../../store/requests.js';

import './homePage.css';

function MyCharities() {
    const dispatch = useDispatch();
    
    const session = useSelector(state => state?.session);
    const groups = useSelector(state => state?.group);
    const requests = useSelector(state => state?.requests); // Fix: access `requests` inside state

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchMyGroupsThunk());
            await dispatch(fetchMyRequestsThunk());
            setLoaded(true);
        };
        fetchData();
    }, [dispatch]);

    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }
    
    // // if (!session || Object.keys(groups).length === 0 || Object.keys(requests).length === 0) {
    //     return (
    //         <div className='homePageMainDiv'>
    //             {/* display loading or empty messages. */}
    //             <p>loading or no data</p>
    //         </div>
    //     )
    // }

    return loaded && (
        <div className='homePageMainDiv'>
            {/* Groups Section */}
            <div className='hpgroupOutDiv'>
                <div className='hpgroupheader'>
                    <h1>My Listings</h1>
                </div>
                {Object.values(groups).length === 0 && (
                    <h2 className='hpgroupsAllPart'>
                        When you create an organization you will be considered its "go-to person." Messages regarding the group will appear in messages. Buttons will also populate allowing you to edit its data or delete it. This message will then disappear.
                    </h2>
                )}
                <div className='hpgroupsAllPart'>
                    {Object.values(groups).map(gruppe => (
                        <MyCharityCard group={gruppe} key={gruppe?.id} />
                    ))}
                </div>
            </div>

            {/* Requests Section */}
            <div className='hpgroupOutDiv'>
                <div className='hpgroupheader' id='hprequestheader'>
                    <h1>My Requests</h1>
                </div>
                {Object.values(requests).length === 0 && (
                    <h2 className='hpgroupsAllPart'>
                        When you create a request it will appear here. Messages regarding the request will populate in messages. This message will then dissapear.
                    </h2>
                )}
                <div className='hpgroupsAllPart'>
                    {Object.values(requests).map(request => (
                        <MyRequestsCard request={request} key={request?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyCharities;
