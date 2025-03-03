const MY_REQUESTS = 'requests/mine'
const DESTROY_REQUEST = 'requests/destroy'
const REQUEST_ERROR = "requests/error"

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



export const fetchMyRequestsThunk = () => async (dispatch, getState) => {
    try {
        const token = getState().session.user?.token;
        if (!token) {
            console.error("No token found. User might not be logged in.");
            return;
        }

        const response = await fetch('/api/requests/current', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include" // Ensures cookies are sent
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching requests:", errorData);
            dispatch(requestErrorAction(errorData));
            return;
        }

        const data = await response.json();
        console.log("Fetched requests:", data);
        dispatch(myRequestsGetAction(data.Requests));
    } catch (error) {
        console.error("Fetch error:", error);
        dispatch(requestErrorAction(error.message));
    }
};

export const deleteRequestThunk = (id) => async (dispatch, getState) => {
    try {
        const token = getState().session.user?.token;
        if (!token) return console.error("No token found.");

        const response = await fetch(`/api/requests/${id}/edit`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"
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