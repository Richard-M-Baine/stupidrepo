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


export const fetchMyRequestsThunk = () => async dispatch => {

    const response = await fetch('/api/requests/current')

    if (response.ok) {

        const requests = await response.json()

        dispatch(myRequestsGetAction(requests))

        return requests
    }

}

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

            action.payload.requests.forEach(request => {
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