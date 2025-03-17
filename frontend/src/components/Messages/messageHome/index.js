import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MySentMessageCard from '../sentMessagesCard/index.js'
import MyReceivedMessageCard from '../receivedMessagesCard/index.js'

import { fetchMySentMessagesThunk } from '../../../store/messages.js'
import { fetchMyReceivedMessagesThunk } from '../../../store/messages.js'

import './homeMessage.css'

function MyMessages() {

    const dispatch = useDispatch()
    const messages = useSelector(state => state?.messages)
    const receivedMessages = useSelector(state => state?.recmessages)

    const messageList = Object.values(messages)
    const receivedMessageList = Object.values(receivedMessages)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchMySentMessagesThunk())
            .then(dispatch(fetchMyReceivedMessagesThunk()))
            .then(() => setLoaded(true))
    }, [dispatch])


    return loaded && (
        <div className='messagesHomeMainDiv'>


            <div className='messagesHomeSecDiv'>
                <h2 className='messagesHomeSecHeadline'>My sent messages</h2>
                {messageList.map(message => (
                    <MySentMessageCard message={message} key={message?.id} />
                ))}
            </div>
            <h1 className='messagesHomeHeadDiv'>Your Messages</h1>
            <div className='messagesHomeSecDiv'>
                <h2 className='messagesHomeSecHeadline'>My received messages</h2>
                {receivedMessageList.map(receivedMessage => (
                    <MyReceivedMessageCard receivedMessage={receivedMessage} key={receivedMessage?.id} />
                ))}
            </div>

        </div>
    )
}

export default MyMessages