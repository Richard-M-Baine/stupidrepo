import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom';

import '../../createMessageModal/createMessage.css'

import { createMessageThunk } from '../../../../store/messages';


const RespondToUserMessageForm = ({receivedMessage}) => {
  
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const [body, setBody] = useState('')
 


  

  const submit = async e => {
    e.preventDefault()

    const payload = {
      body,
      recipient: receivedMessage?.sender
      
    }
    
    await dispatch(createMessageThunk(payload))

    history.push('/mylistings')
  }

  return (
    <form className='signupFormOut' onSubmit={submit} >
      <h1> Enter your message below.</h1>
      <h3> Please enter any information that you feel is necessary. We do not give away any information about anyone besides your username. </h3>


      <span className="text14 textcolor-grey">Character count: {2000 - body.length} remaining</span>
      <textarea
        rows='14'
        cols='100'
        type='text'
        placeholder='please enter between 1 and 2000 characters'
        maxLength='2000'
        onChange={text => setBody(text.target.value)}
        value={body}
      />
      <button type='submit' className='createMessageSubmitButton'disabled={body.length < 1 || body.length > 2000}>Send Message</button>
    </form>
  );
};

export default RespondToUserMessageForm;