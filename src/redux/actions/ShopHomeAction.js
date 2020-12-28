import { 
    GET_SHOP_HOME_REQUEST, 
    GET_SHOP_HOME_SUCCESS, 
    GET_SHOP_HOME_ERROR
} from '../constants/ShopHomeActionType';
import shopService from '../../api/shopService';

export const getShopHomeRequest = () =>{
    return {
        type: GET_SHOP_HOME_REQUEST
    }
}

export const getShopHomeSuccess = (response) =>{
    return {
        type: GET_SHOP_HOME_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getShopHomeError = (error) =>{
    return {
        type: GET_SHOP_HOME_ERROR,
        error: {
            ...error
        } 
    }
}

export const getShopHome = (pageIndex, pageSize, latitude, longitude) => {

    return async (dispatch) => {
        dispatch(getShopHomeRequest())

        shopService.getHome(pageIndex, pageSize, latitude, longitude).then(res => {
            if(res.statusCode == 200){
                dispatch(getShopHomeSuccess(res));
            }
            else{
                getShopHomeError(res)
            }
        }).catch(error => dispatch(getShopHomeError(error)));

        
    };

};