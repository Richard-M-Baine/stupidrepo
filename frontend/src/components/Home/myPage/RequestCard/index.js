import { NavLink, useNavigate} from 'react-router-dom';
import React from 'react'
import {useDispatch} from 'react-redux'

import {deleteRequestThunk} from '../../../../store/requests.js'
import './requestCard.css'

function MyRequestsCard({request}) {

    

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    
   
    const destroyRequest = e => {
        e.preventDefault()
        dispatch(deleteRequestThunk(request?.id)).then(() => navigate('/mylistings'))
    }

    const editRequest = e => {
        
        e.preventDefault()
        navigate(`/requests/edit/${request?.id}`)
        }


        const formatDate = (dateString) => {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });
        };
        
        let formattedStartTime = formatDate(request?.startTime);
        
 

    
  

    return (
        <div>
        <NavLink className='navRequestAllgroupcard' to={`/requests/${request?.id}`}> 
        <div className='groupcardtext' id='requestcardtextdiv'>
        <h1 id='requestcardtitle'>{request?.title}</h1>
        <p>{request?.address} {request?.city}</p>
        <p>Start Time: {formattedStartTime}</p>
        </div>
        </ NavLink>
        <div className='buttondivgroupcard'>
        <button className='groupcardbutton' onClick={editRequest}>Edit Request</button>
        <button className='groupcardbutton' onClick={destroyRequest}>Remove Request</button>
        </div >
        </div >

    )
}


export default MyRequestsCard