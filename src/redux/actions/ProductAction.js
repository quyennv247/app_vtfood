import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR } from '../constants/ProductActionType';
import productService from './../../api/productService';

export const getProductRequest = () =>{
    return {
        type: GET_PRODUCT_REQUEST
    }
}

export const getProductSuccess = (response) =>{
    return {
        type: GET_PRODUCT_SUCCESS,
        payload: {
            ...response
        }
    }
}

export const getProductError = (error) =>{
    return {
        type: GET_PRODUCT_ERROR,
        error: {
            ...error
        } 
    }
}

export const getProductBestSeller = (pageIndex, pageSize) => {
    return async (dispatch) => {
        dispatch(getProductRequest())
        productService.getBestSeller(pageIndex, pageSize).then(res => {
            if(res.statusCode == 200){
                dispatch(getProductSuccess(res));
            }
            else{
                getProductError(res)
            }
            
        }).catch(error => dispatch(getProductError(error)));

    };

};

export const getProductByShop = (pageIndex, pageSize, shopId) => {
    return async (dispatch) => {
        dispatch(getProductRequest())

        productService.getByShop(pageIndex, pageSize, shopId).then(res => {
            if(res.statusCode == 200){
                dispatch(getProductSuccess(res));
            }
            else{
                getProductError(res)
            }
            
        }).catch(error => dispatch(getProductError(error)));

    };

};