import React from 'react';
import * as sessionActions from '../../store/session.js';
import { useDispatch} from 'react-redux';

import './Demonstration.css';

export default function DemoUser() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = 'bilbo@gmail.com';
        const password = 'password';
        alert('your going to be logged in as Bilbo Baggins.  Use your power wisely')
        return dispatch(sessionActions.login(email, password ))
    }
    return (
        <form onSubmit={handleSubmit}>
             
            <button className = 'buttonsplash'type='submit'>Demo User</button>
        </form>
    )
}