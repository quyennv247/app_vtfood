import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR  } from '../constants/ProductActionType';

const initialState = {
    data: null,
    loading: true,
    error: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case GET_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                error: true
            };
        default:
            return state;
    }
};


export default productReducer;