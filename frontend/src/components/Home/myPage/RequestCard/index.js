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
        navigate.push(`/requests/edit/${request?.id}`)
        }


    let date = request?.start_time?.slice(5,7) || '00'
    let day = request?.start_time?.slice(0,3) || 'N/A'
    let month = request?.start_time?.slice(8,11) || 'N/A'
    let year = request?.start_time?.slice(12,16) || 'N/A'
    let hour = request?.start_time?.slice(17,19) || 'N/A'
    let minute = request?.start_time?.slice(20,22) || 'N/A'
    let zeit
    if (hour > 12){
        zeit = `${hour-12}:${minute} PM`
    }
    else {
        zeit = `${hour}:${minute} AM`
    }

    
  

    return (
        <div>
        <NavLink className='navRequestAllgroupcard' to={`/requests/${request?.id}`}> 
        <div className='groupcardtext' id='requestcardtextdiv'>
        <h1 id='requestcardtitle'>{request?.title}</h1>
        <p>{request?.address} {request?.city}</p>
        <p>Start Time {day} {date} {month} {year} at {zeit}</p>
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