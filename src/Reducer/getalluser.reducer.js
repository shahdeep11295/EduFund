import { GET_ALL_USERS, UPDATE_USER } from '../utils/constant'
export default function (state = { alluser: [] }, action) {
    switch (action.type) {

        case GET_ALL_USERS:
            return {
                ...state,
                alluser: action.payload,
            }
        case UPDATE_USER:

            const p = state.alluser.map((item) => {
                if (item.email === action.payload.email) {
                    return { ...item, ...action.payload }
                } else {
                    return item
                }
            })
            return {
                ...state,
                alluser: p
            }
        default:
            return state
    }
}