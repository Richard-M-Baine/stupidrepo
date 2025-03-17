const MY_MESSAGES =  'messages/mine'
const MESSAGE_ERROR = "message/error"
const DESTROY_MESSAGE = 'message/destroy'
const MARK_READ = 'messages/edit'
const MAKE_MESSAGE = 'messages/create'




const myMessagesRequestAction = (messages) => ({
    type: MY_MESSAGES,
    payload: messages
})



const messageErrorAction = (error) => ({
    type: MESSAGE_ERROR,
    error
})

const deleteMessageAction = (messageId) => ({
    type: DESTROY_MESSAGE,
    messageId
});

const createMessageAction = payload => {
    return {
        type: MAKE_MESSAGE,
        payload: payload
    }
}

const MarkReadAction = id  => {
    return {
        type: MARK_READ,
        id
    }
}


export const fetchMySentMessagesThunk = () => async (dispatch) => {
    try {


        const response = await fetch('/api/messages/sent', {
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
            dispatch(myMessagesRequestAction(errorData));
            return;
        }

        const data = await response.json();
        dispatch(myMessagesRequestAction(data.Messages));
    } catch (error) {
        console.error("Fetch error: in requests thunk", error);
        dispatch(messageErrorAction(error.message));
    }
}

export const deleteMessageThunk = (id) => async (dispatch, getState) => {
    try {


        const response = await fetch(`/api/messages/${id}/delete`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (response.ok) {
            dispatch(deleteMessageAction(id));
        } else {
            const errorData = await response.json();
            console.error("Error deleting request:", errorData);
        }
    } catch (error) {
        console.error("Delete request error:", error);
    }
};




export const createMessageThunk = (payload) => async dispatch => {

    const response = await fetch('/api/messages/create',
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
        await dispatch(createMessageAction(data))
        return data
    } else { // any bad requests and errors
        return data
    }

}

export const markReadThunk = id => async (dispatch) => {

    const response = await fetch(`/api/messages/${id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await response.json();
    console.log(data)
    dispatch(MarkReadAction(data));
    return data
}


const initialState = {}

const messageReducer = (state = initialState, action) => {

    let newState = {}

    switch (action.type) {

        case MY_MESSAGES: {
            if (!action.payload || !Array.isArray(action.payload)) {
                console.error("Invalid payload structure:", action.payload);
                return state; 
            }
        
            newState = {};
            action.payload.forEach(message => {  
                newState[message.id] = message;
            });
            return newState;
        }
        

        case DESTROY_MESSAGE: {
            newState = { ...state }
            delete newState[action.messageId]
            return newState
        }

        case MAKE_MESSAGE: {
            newState = { ...state };
            const message = action.payload.newMessage; 
            newState[message.id] = message;
            return newState;
        }

        default: {
            return state
        }
    }
}

export default messageReducer