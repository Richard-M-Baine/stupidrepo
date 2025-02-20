import React, { useState, useEffect } from 'react'

const CREATE_GROUP = 'groups/new'
const MY_GROUPS = 'groups/mine'
const DESTROY_GROUP = 'groups/destroy'

const myGroupsGetAction = payload => {

    return {
        type: MY_GROUPS,
        payload: payload
    }
}

const deleteGroupAction = (groupId) => {
    return {
        type: DESTROY_GROUP,
        groupId
    }
}

const createGroupAction = payload => {

    return {
        type: CREATE_GROUP,
        payload: payload
    }
}



export const fetchMyGroupsThunk = () => async (dispatch, getState) => { // Add getState
    const token = getState().session.user?.token;
    // or if the token is in local storage:
    // const token = localStorage.getItem('token')
    
    if (!token) {
        console.error("No token found. User might not be logged in.");
        return; // Or handle the error as needed
    }

    const response = await fetch('/api/groups/current', {
        headers: {
            'Authorization': `Bearer ${token}` // Add the token to the header
        }
    });

    if (response.ok) {
        const groups = await response.json();
        console.log("API Response:", groups);
        dispatch(myGroupsGetAction(groups));
        return groups;
    } else {
        // Handle error responses, e.g.,
        const errorData = await response.json(); // If the server sends error details
        console.error("Error fetching groups:", response.status, errorData);
        // Dispatch an error action if you have one
        // dispatch(fetchGroupsError(errorData));
    }
};

export const deleteGroupThunk = (id) => async dispatch => {
    const response = await fetch(`/api/groups/${id}/edit`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const group = `${id}`
        dispatch(deleteGroupAction(group));
    }
}

export const createGroupThunk = (payload) => async dispatch => {

    const response = await fetch('/api/groups/create',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

    const data = await response.json()
    console.log('i am data ',data)

    if (response.ok) {
        await dispatch(createGroupAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}



const initialState = {}

const groupReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {

        case CREATE_GROUP: {
            newState = { ...state };
            const group = action.payload.newCharity; // Extract newCharity instead of expecting group
            newState[group.id] = group;
            return newState;
        }
        

        case MY_GROUPS: {
            if (!action.payload || !Array.isArray(action.payload.Charities)) {
                console.error("Invalid payload structure:", action.payload);
                return state; 
            }
        
            newState = {};
            action.payload.Charities.forEach(group => {  // Use Charities instead of groups
                newState[group.id] = group;
            });
            return newState;
        }
        

        case DESTROY_GROUP: {
            newState = { ...state }
            delete newState[action.groupId]
            return newState
        }


        default: {
            return state;
        }
    }
}


export default groupReducer;