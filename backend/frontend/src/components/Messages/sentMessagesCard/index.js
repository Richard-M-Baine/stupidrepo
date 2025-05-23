import {  useNavigate} from 'react-router-dom';
import React from 'react'
import { useDispatch} from 'react-redux'

import { deleteMessageThunk} from '../../../store/messages'
import './sentMessages.css'

function MySentMessageCard({message}){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const destroyMessage = e => {
        e.preventDefault()
        dispatch(deleteMessageThunk(message?.id))
        .then(() => navigate('/mylistings'))
    }


    return (
        <div className='sentMessageCardMainDiv'>
            <div className='sentMessageCardRecipient'> sent to {message?.recipient}</div>
            <div className='sentMessageCardBody'>{message?.body}</div>
            <button className='sentMessageCardDelete' onClick={destroyMessage}>Delete Message</button>

        </div>
    )
}

export default MySentMessageCard