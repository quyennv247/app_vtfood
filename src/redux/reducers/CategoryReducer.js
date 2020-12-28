import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR  } from '../constants/CategoryActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                data: [],
                loading: true
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case GET_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default categoryReducer;