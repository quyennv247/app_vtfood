import { 
    GET_SHOP_DETAIL_REQUEST,
    GET_SHOP_DETAIL_SUCCESS,
    GET_SHOP_DETAIL_ERROR
} from '../constants/ShopDetailActionType';
import shopService from '../../api/shopService';

export const getShopDetailRequest = () =>{
    return {
        type: GET_SHOP_DETAIL_REQUEST
    }
}

export const getShopDetailSuccess = (response) =>{
    return {
        type: GET_SHOP_DETAIL_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getShopDetailError = (error) =>{
    return {
        type: GET_SHOP_DETAIL_ERROR,
        error: {
            ...error
        } 
    }
}


export const getShopById = (id, latitude, longitude) => {

    return async (dispatch) => {
        dispatch(getShopDetailRequest());

        shopService.getById(id, latitude, longitude).then(res => {
            if(res.statusCode == 200){
                dispatch(getShopDetailSuccess(res));
            }
            else{
                getShopDetailError(res)
            }
        }).catch(error => dispatch(getShopDetailError(error)));
        
    };

};
