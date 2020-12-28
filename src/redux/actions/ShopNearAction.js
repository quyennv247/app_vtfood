import { 
    GET_SHOP_NEAR_REQUEST,
    GET_SHOP_NEAR_SUCCESS,
    GET_SHOP_NEAR_ERROR
} from '../constants/ShopNearActionType';
import shopService from '../../api/shopService';

export const getShopNearRequest = () =>{
    return {
        type: GET_SHOP_NEAR_REQUEST
    }
}

export const getShopNearSuccess = (response) =>{
    return {
        type: GET_SHOP_NEAR_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getShopNearError = (error) =>{
    return {
        type: GET_SHOP_NEAR_ERROR,
        error: {
            ...error
        } 
    }
}


export const getShopNear = (pageIndex, pageSize, latitude, longitude) => {

    return async (dispatch) => {
        dispatch(getShopNearRequest());

        shopService.getNear(pageIndex, pageSize, latitude, longitude).then(res => {
            if(res.statusCode == 200){
                dispatch(getShopNearSuccess(res));
            }
            else{
                getShopNearError(res)
            }
        }).catch(error => dispatch(getShopNearError(error)));

        
    };

};
