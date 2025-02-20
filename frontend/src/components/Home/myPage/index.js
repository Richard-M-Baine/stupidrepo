import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyCharityCard from './GroupCard/index.js'
import MyRequestsCard from './RequestCard/index.js'



import { fetchMyGroupsThunk } from '../../../store/groups.js'
import { fetchMyRequestsThunk } from '../../../store/requests.js'

import './homePage.css'


function MyCharities() {
    const dispatch = useDispatch()
    const session = useSelector(state => state?.session)
    const groups = useSelector(state => state?.group)

    const requests = useSelector(state => state?.requests)

    
    

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        
        dispatch(fetchMyGroupsThunk())
            
            .then(dispatch(fetchMyRequestsThunk()))
            .then(() => setLoaded(true))
    }, [dispatch])

    if (!session || !groups || !requests) {
        return <p>wait a bloody minute...</p>; 
    }

   

    return loaded && (
        <div className='homePageMainDiv'>

            <div className='hpgroupOutDiv'>
                <div className='hpgroupheader'>
                    <h1>My Listings</h1>
                </div>
                {Object.values(groups).length === 0 && (
    <h2 className='hpgroupsAllPart'>
        When you create an organization you will be considered its "go to person." Messages regarding the group will appear next to it. Buttons will also populate allowing you to edit its data or delete it. This message will then disappear.
    </h2>
)}
                <div className='hpgroupsAllPart'>
                    {Object.values(groups).map(gruppe => (
                        <MyCharityCard group={gruppe} key={gruppe?.id} />
                    ))}
                </div>

            </div>

            <div className='hpgroupOutDiv'>
                <div className='hpgroupheader' id='hprequestheader'>
                    <h1>My Requests</h1>
                </div>

                {Object.values(requests).length === 0 && 

                    <h2 className='hpgroupsAllPart'>When you create a request it will appear here.  Messages regarding the request will populate next to it.  This message will also disappear once a request is present.  </h2>

                }

                <div className='hpgroupsAllPart'>
                    {Object.values(requests).map(request => (
                        <MyRequestsCard request={request} key={request?.id} />
                    ))}
                </div>

            </div>
        </div>
    )

}

export default MyCharities;