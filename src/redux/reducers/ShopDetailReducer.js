import { 
    GET_SHOP_DETAIL_REQUEST,
    GET_SHOP_DETAIL_SUCCESS,
    GET_SHOP_DETAIL_ERROR
} from '../constants/ShopDetailActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const shopDetailReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SHOP_DETAIL_REQUEST:
            return {
                ...state,
                data: null,
                loading: true
            };
        case GET_SHOP_DETAIL_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                loading: false
            };
        case GET_SHOP_DETAIL_ERROR:
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


export default shopDetailReducer;