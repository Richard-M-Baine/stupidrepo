import React, { useState, useEffect } from 'react'

const EDIT_GROUP = 'group/edit'
const CREATE_GROUP = 'groups/new'
const MY_GROUPS = 'groups/mine'
const DESTROY_GROUP = 'groups/destroy'
const ONE_GROUP = 'groups/one'
const ALL_GROUPS = 'groups/all'

const getAllGroupsAction = payload => {

    return {
        type: ALL_GROUPS,
        payload
    }
}

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

const getOneGroupAction = payload => {

    return {
        type: ONE_GROUP,
        payload
    }
}

const EditGroupAction = group => {
    return {
        type: EDIT_GROUP,
        group
    }
}


// all groups
export const fetchAllGroupsThunk = () => async dispatch => {

    const response = await fetch('/api/groups/all')

    if (response.ok) {

        const groups = await response.json()

        dispatch(getAllGroupsAction(groups))

        return groups
    }

}



export const fetchMyGroupsThunk = () => async (dispatch) => { 
    const response = await fetch('/api/groups/current', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const groups = await response.json();
        dispatch(myGroupsGetAction(groups));
        return groups;
    } else {
        const errorData = await response.json(); 
        console.error("Error fetching groups: groups thunk", response.status, errorData);
        // Dispatch an error action if needed
    }
};

export const deleteGroupThunk = (id) => async dispatch => {
    const response = await fetch(`/api/groups/${id}/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'

        }
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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

    const data = await response.json()

    if (response.ok) {
        await dispatch(createGroupAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}

export const editGroupThunk = (payload, id) => async (dispatch) => {
    
   
    const response = await fetch(`/api/groups/${id}/edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        
        
    })

    const data = await response.json();
    


    dispatch(EditGroupAction(data));
    return data;
}

export const getOneGroupThunk = id => async dispatch => {

    const res = await fetch(`/api/groups/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (res.ok) {


        const singleGroup = await res.json()

        dispatch(getOneGroupAction(singleGroup))
        return singleGroup
    }

}



const initialState = {}

const groupReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {


        case ALL_GROUPS: {
            action.payload.groups.forEach(group => {
                newState[group.id] = group
            })
            return newState
        }

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

        case EDIT_GROUP: {

            const newerState = Object.assign({}, state);
            newerState.group = action.payload;
            return newerState;
        }

        case ONE_GROUP: {

            newState = { ...state };
            newState[action.payload.id] = action.payload;

            return newState

        }


        default: {
            return state;
        }
    }
}


export default groupReducer;