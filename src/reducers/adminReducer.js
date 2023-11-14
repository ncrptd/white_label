export const ADMIN_ACTION = {
    ADD_USER: 'ADD_USER',
    GET_USERS: 'GET_USER',
    DELETE_USER: 'DELETE_USER',
    DELETE_TEMP_DELETE: 'TEMP_DELETE'
}

function adminReducer(state, action) {
    const { type, payload } = action
    switch (type) {
        case ADMIN_ACTION.ADD_USER: {
            return { ...state, users: [...state.users, payload.user] }
        }
        case ADMIN_ACTION.GET_USERS: {
            return { ...state, users: payload.users }
        }
        case ADMIN_ACTION.DELETE_USER: {
            return { ...state, users: payload.users }
        }
        case ADMIN_ACTION.DELETE_TEMP_DELETE: {
            return { ...state, users: payload.users }
        }
    }
}


export default adminReducer