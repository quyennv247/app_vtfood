import { 
    GET_SHOP_HOME_REQUEST, 
    GET_SHOP_HOME_SUCCESS, 
    GET_SHOP_HOME_ERROR
} from '../constants/ShopHomeActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const shopHomeReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SHOP_HOME_REQUEST:
            return {
                ...state,
                data: [],
                loading: true
            };
        case GET_SHOP_HOME_SUCCESS:
            return {
                ...state,
                data: action.data.Items,
                loading: false
            };
        case GET_SHOP_HOME_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default shopHomeReducer;