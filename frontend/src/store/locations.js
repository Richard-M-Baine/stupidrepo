import React, { useState, useEffect } from 'react'

const EDIT_LOCATION = 'location/edit'
const ONE_LOCATION = 'locations/one'
const ALL_LOCATIONS ='locations/all'


const getAllLocationsAction = payload => {

    return {
        type: ALL_LOCATIONS,
        payload
    }
}

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


export const fetchAllLocationsThunk = () => async dispatch => {

    const response = await fetch('/api/location/all')

    if (response.ok) {

        const locations = await response.json()

        dispatch(getAllLocationsAction(locations))

        return locations
    }

}

export const getOneLocationThunk = id => async dispatch => {
    
    const res = await fetch(`/api/locations/${id}`, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        
        
        
        const singleLocation = await res.json()
        
        
        dispatch(getOneLocationAction(singleLocation))
        return singleLocation
    }

}

export const editLocationThunk = (payload, id) => async (dispatch) => {
   
    const response = await fetch(`/api/locations/edit/${id}`, {
        method: 'PUT',
        credentials: 'include',
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

       
        case ALL_LOCATIONS: {
            action.payload.locations.forEach(location => {
                newState[location.id] = location
            })
            return newState
        }

        case EDIT_LOCATION: {
            newState = { ...state };
            newState[action.payload.id] = action.payload; // Update the location by its ID
            return newState;
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