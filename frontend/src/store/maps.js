const GET_KEY = 'location/map'


const getMapKeyAction = payload => {
    return {
        type: GET_KEY,
        payload
    }
}


export const fetchAPIKeyThunk = (payload) => async dispatch => {
   
    const res = await fetch('/api/maps/key', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

    const data = await res.json()
    

    dispatch(getMapKeyAction(data.googleMapsAPIKey))

    

}

const initialState = {}

const mapReducer= (state = initialState, action) => {
    switch(action.type){
        case GET_KEY:
            return {key: action.payload}
        default:
            return state
    }
}

export default mapReducer;