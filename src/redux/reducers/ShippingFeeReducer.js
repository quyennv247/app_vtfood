import { 
    GET_SHIPPING_FEE_REQUEST,
    GET_SHIPPING_FEE_SUCCESS,
    GET_SHIPPING_FEE_ERROR
} from '../constants/ShippingFeeActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const shippingFeeReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SHIPPING_FEE_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case GET_SHIPPING_FEE_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                loading: false
            };
        case GET_SHIPPING_FEE_ERROR:
            return {
                ...state,
                data: null,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default shippingFeeReducer;