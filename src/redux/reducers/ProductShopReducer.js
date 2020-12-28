import { GET_PRODUCT_SHOP_REQUEST, GET_PRODUCT_SHOP_SUCCESS, GET_PRODUCT_SHOP_ERROR  } from '../constants/ProductShopActionType';

const initialState = {
    data: null,
    pager: {},
    total: 0,
    loading: true,
    error: null
}

export const productShopReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_PRODUCT_SHOP_REQUEST:
            return {
                ...state,
                data: null,
                total: 0,
                loading: true
            };
        case GET_PRODUCT_SHOP_SUCCESS:
            return {
                ...state,
                data: action.payload.data.Items,
                pager: action.payload.data.Pager,
                total: action.payload.data.Total,
                loading: false,
            };
        case GET_PRODUCT_SHOP_ERROR:
            return {
                ...state,
                loading: false,
                data: null,
                total: 0,
                error: true
            };
        default:
            return state;
    }
};


export default productShopReducer;