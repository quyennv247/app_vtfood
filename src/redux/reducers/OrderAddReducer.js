import { ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_ERROR  } from '../constants/OrderAddActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const orderAddReducer = (state = initialState, action) => {
    //console.log('orderAddReducer');
            //console.log(action);
    switch (action.type){
        case ADD_ORDER_REQUEST:
            return {
                ...state,
                data: [],
                loading: true
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case ADD_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default orderAddReducer;