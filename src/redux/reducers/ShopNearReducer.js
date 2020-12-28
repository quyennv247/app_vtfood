import { 
    GET_SHOP_NEAR_REQUEST,
    GET_SHOP_NEAR_SUCCESS,
    GET_SHOP_NEAR_ERROR
} from '../constants/ShopNearActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const shopNearReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SHOP_NEAR_REQUEST:
            return {
                ...state,
                data: [],
                loading: true
            };
        case GET_SHOP_NEAR_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            };
        case GET_SHOP_NEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default shopNearReducer;