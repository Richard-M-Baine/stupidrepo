const MY_RECEIVED_MESSAGES = 'messages/received'
const RECMESSAGE_ERROR = "recmessages/error"


const myMessagesReceivedAction = (messages) => ({
    type: MY_RECEIVED_MESSAGES,
    payload: messages
})

const recMessageErrorAction = (error) => ({
    type: RECMESSAGE_ERROR,
    error
})

export const fetchMyReceivedMessagesThunk = () => async (dispatch) => {
    try {


        const response = await fetch('/api/messages/response', {
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
            dispatch(recMessageErrorAction(errorData));
            return;
        }

        const data = await response.json();
        dispatch(myMessagesReceivedAction(data.Messages));
    } catch (error) {
        console.error("Fetch error: in requests thunk", error);
        dispatch(recMessageErrorAction(error.message));
    }
}

const initialState = {}

const recMessageReducer = (state = initialState, action) => {

    let newState = {}

    switch (action.type) {

        
        case MY_RECEIVED_MESSAGES: {
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
        default: {
            return state;
        }

    }
}


export default recMessageReducer