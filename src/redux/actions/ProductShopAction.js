import { GET_PRODUCT_SHOP_REQUEST, GET_PRODUCT_SHOP_SUCCESS, GET_PRODUCT_SHOP_ERROR } from '../constants/ProductShopActionType';
import productService from './../../api/productService';

export const getProductShopRequest = () =>{
    return {
        type: GET_PRODUCT_SHOP_REQUEST
    }
}

export const getProductShopSuccess = (response) =>{
    return {
        type: GET_PRODUCT_SHOP_SUCCESS,
        payload: {
            ...response
        }
    }
}

export const getProductShopError = (error) =>{
    return {
        type: GET_PRODUCT_SHOP_ERROR,
        error: {
            ...error
        } 
    }
}

export const getProductShop = (pageIndex, pageSize, shopId) => {
    return async (dispatch) => {
        dispatch(getProductShopRequest())

        productService.getByShop(pageIndex, pageSize, shopId).then(res => {
            if(res.statusCode == 200){
                dispatch(getProductShopSuccess(res));
            }
            else{
                getProductShopError(res)
            }
            
        }).catch(error => dispatch(getProductShopError(error)));

    };

};