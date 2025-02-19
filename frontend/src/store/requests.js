import React, { useState, useEffect } from 'react'
const MY_REQUESTS = 'requests/mine'
const DESTROY_REQUEST = 'requests/destroy'


const myRequestsGetAction = payload => {

    return {
        type: MY_REQUESTS,
        payload: payload
    }
}

const deleteRequestAction = (requestId) => {
    return {
       type: DESTROY_REQUEST,
       requestId
   }
}


export const fetchMyRequestsThunk = () => async (dispatch, getState) => { // Add getState
    const token = getState().session.user?.token;
    // or if the token is in local storage:
    // const token = localStorage.getItem('token')
    
    if (!token) {
        console.error("No token found. User might not be logged in.");
        return; // Or handle the error as needed
    }

    const response = await fetch('/api/requests/current', {
        headers: {
            'Authorization': `Bearer ${token}` // Add the token to the header
        }
    });

    if (response.ok) {
        const requests = await response.json();
        console.log("API Response:", requests);
        dispatch(myRequestsGetAction(requests));
        return requests;
    } else {
        // Handle error responses, e.g.,
        const errorData = await response.json(); // If the server sends error details
        console.error("Error fetching requests:", response.status, errorData);
        // Dispatch an error action if you have one
        // dispatch(fetchGroupsError(errorData));
    }
};

export const deleteRequestThunk = (id) => async dispatch => {
    const response = await fetch(`/api/requests/${id}/edit`, {
        method: 'DELETE'
    });

    if(response.ok){
        const request = `${id}`
        dispatch(deleteRequestAction(request));
    }
}


// reducerville

const initialState = {}

const requestReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {



        case MY_REQUESTS: {

            action.payload.Requests.forEach(request => {
                newState[request.id] = request
            })
            return newState
        }

        case DESTROY_REQUEST: {
            newState = { ...state}
            delete newState[action.requestId]
            return newState
    }

    default: {
        return state;
    }
    }

}
    export default requestReducer