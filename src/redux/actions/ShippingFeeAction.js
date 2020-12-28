import { 
    GET_SHIPPING_FEE_REQUEST,
    GET_SHIPPING_FEE_SUCCESS,
    GET_SHIPPING_FEE_ERROR
} from '../constants/ShippingFeeActionType';
import shippingFeeService from '../../api/shippingFeeService';

export const getShippingFeeRequest = () =>{
    return {
        type: GET_SHIPPING_FEE_REQUEST
    }
}

export const getShippingFeeSuccess = (response) =>{
    return {
        type: GET_SHIPPING_FEE_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getShippingFeeError = (error) =>{
    return {
        type: GET_SHIPPING_FEE_ERROR,
        error: {
            ...error
        } 
    }
}


export const getFee = (distance) => {

    return async (dispatch) => {
        dispatch(getShippingFeeRequest());

        shippingFeeService.getFee(distance).then(res => {
            if(res.statusCode == 200){
                dispatch(getShippingFeeSuccess(res));
            }
            else{
                getShippingFeeError(res)
            }
        }).catch(error => dispatch(getShippingFeeError(error)));
        
    };

};
