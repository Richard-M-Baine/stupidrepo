import { useSelector } from 'react-redux';
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



export const fetchMyGroupsThunk = () => async (dispatch, getState) => { // Add getState
    const token = useSelector(state => state.session.user.token)
    // or if the token is in local storage:
    // const token = localStorage.getItem('token')
    console.log('token in thunk ', token)
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



const initialState = {}

const groupReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {

        

        case MY_GROUPS: {

            action.payload.groups.forEach(group => {
                newState[group.id] = group
            })
            return newState
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