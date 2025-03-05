const MY_REQUESTS = 'requests/mine'
const DESTROY_REQUEST = 'requests/destroy'
const REQUEST_ERROR = "requests/error"
const EDIT_REQUEST = 'request/edit'
const ONE_REQUEST = 'requests/one'
const CREATE_REQUEST = 'requests/new'


const myRequestsGetAction = (requests) => ({
    type: MY_REQUESTS,
    payload: requests
});

const deleteRequestAction = (requestId) => ({
    type: DESTROY_REQUEST,
    requestId
});

const requestErrorAction = (error) => ({
    type: REQUEST_ERROR,
    error
});

const editRequestAction = payload => {
    return {
        type: EDIT_REQUEST,
        payload
    }
}

const getOneRequestAction = payload => {

    return {
        type: ONE_REQUEST,
        payload
    }
}

const createRequestAction = payload => {

    return {
        type: CREATE_REQUEST,
        payload: payload
    }
}

export const getOneRequestThunk = id => async dispatch => {

    const res = await fetch(`/api/requests/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (res.ok) {


        const singleRequest = await res.json()

        dispatch(getOneRequestAction(singleRequest))
        return singleRequest
    }

}

export const fetchMyRequestsThunk = () => async (dispatch, getState) => {
    try {


        const response = await fetch('/api/requests/current', {
            method: "GET",
            credentials: "include",
            headers: {

                "Content-Type": "application/json"
            },
            // Ensures cookies are sent
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching requests:", errorData);
            dispatch(requestErrorAction(errorData));
            return;
        }

        const data = await response.json();
        dispatch(myRequestsGetAction(data.Requests));
    } catch (error) {
        console.error("Fetch error: in requests thunk", error);
        dispatch(requestErrorAction(error.message));
    }
};

export const editRequestThunk = (payload, id) => async (dispatch) => {



    const response = await fetch(`/api/requests/${id}/edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),

    })
    const data = await response.json();

    dispatch(editRequestAction(data))
    return data
}

export const deleteRequestThunk = (id) => async (dispatch, getState) => {
    try {


        const response = await fetch(`/api/requests/${id}/delete`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (response.ok) {
            dispatch(deleteRequestAction(id));
        } else {
            const errorData = await response.json();
            console.error("Error deleting request:", errorData);
        }
    } catch (error) {
        console.error("Delete request error:", error);
    }
};

export const createRequestThunk = (payload) => async dispatch => {

    const response = await fetch('/api/requests/create',
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
        await dispatch(createRequestAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}



// reducerville

const initialState = {}

const requestReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {



        case MY_REQUESTS: {
            action.payload.forEach(request => {
                newState[request.id] = request
            })
            return newState
        }

        case ONE_REQUEST: {

            newState = {...state };
            newState[action.payload.id] = action.payload;

            return newState
            
        }

        case CREATE_REQUEST: {
            newState = { ...state };
            const request = action.payload.newRequest; // Extract newCharity instead of expecting group
            newState[request.id] = request;
            return newState;
        }


        case DESTROY_REQUEST: {
            newState = { ...state }
            delete newState[action.requestId]
            return newState
        }

        case EDIT_REQUEST: {

            const newerState = Object.assign({}, state);
            newerState.request = action.payload;
            return newerState;
        }




        default: {
            return state;
        }
    }

}
export default requestReducer