const MY_MESSAGES =  'messages/mine'
const MESSAGE_ERROR = "message/error"
const DESTROY_MESSAGE = 'message/destroy'
const MARK_READ = 'messages/edit'
const MAKE_MESSAGE = 'messages/create'
const MY_RECEIVED_MESSAGES = 'messages/received'


const myMessagesRequestAction = (messages) => ({
    type: MY_MESSAGES,
    payload: messages
})

const myMessagesReceivedAction = (messages) => ({
    type: MY_RECEIVED_MESSAGES,
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

export const deleteMessagesThunk = (id) => async (dispatch, getState) => {
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


const initialState = {}

const messageReducer = (state = initialState, action) => {

    let newState = {}

    switch (action.type) {

        case MY_MESSAGES: {
            if (!action.payload || !Array.isArray(action.payload.Messages)) {
                console.error("Invalid payload structure:", action.payload);
                return state; 
            }
        
            newState = {};
            action.payload.Messages.forEach(message => {  
                newState[message.id] = message;
            });
            return newState;
        }

        case DESTROY_MESSAGE: {
            newState = { ...state }
            delete newState[action.messageId]
            return newState
        }

        default: {
            return state
        }
    }
}

export default messageReducer