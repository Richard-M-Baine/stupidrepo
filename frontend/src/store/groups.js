
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



export const fetchMyGroupsThunk = () => async dispatch => {

    const response = await fetch('/api/groups/current')

    if (response.ok) {

        const groups = await response.json()

        dispatch(myGroupsGetAction(groups))

        return groups
    }

}

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