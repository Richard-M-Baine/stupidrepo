import React, { useState, useEffect } from 'react'

const EDIT_LOCATION = 'location/edit'
const ONE_LOCATION = 'locations/one'



const editLocationAction = payload => {
    return {
        type: EDIT_LOCATION,
        payload
    }
}

const getOneLocationAction = payload => {

    return {
        type: ONE_LOCATION,
        payload
    }
}

export const getOneLocationThunk = id => async dispatch => {
    
    const res = await fetch(`/api/location/${id}`);
    if (res.ok) {
        
        
        
        const singleLocation = await res.json()
        
        
        dispatch(getOneLocationAction(singleLocation))
        return singleLocation
    }

}

export const editLocationThunk = (payload, id) => async (dispatch) => {
    
    const response = await fetch(`/api/location/${id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload), 
    })

    const data = await response.json();
    
    dispatch(editLocationAction(data));
    return data;
}


// reducerville
const initialState = {}

const locationReducer = ( state = initialState, action) => {

    let newState = {};

    switch (action.type) {

       

        case EDIT_LOCATION: {

            const newerState = Object.assign({}, state);
            newerState.locations = action.payload;
            return newerState;
        }

       

        case ONE_LOCATION: {

            newState = {...state };
            newState[action.payload.id] = action.payload;

            return newState
            
        }

        default: {
            return state;
        }
    }}


    export default locationReducer;