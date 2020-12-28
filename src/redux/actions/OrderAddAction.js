import { ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_ERROR  } from '../constants/OrderAddActionType';
import orderService from '../../api/orderService';

export const addOrderRequest = () =>{
    return {
        type: ADD_ORDER_REQUEST
    }
}

export const addOrderSuccess = (response) =>{
    return {
        type: ADD_ORDER_SUCCESS,
        data: {
            ...response
        }
    }
}

export const addOrderError = (error) =>{
    return {
        type: ADD_ORDER_ERROR,
        error: {
            ...error
        } 
    }
}

export const addOrder = (order) => {

    return async (dispatch) => {
        dispatch(addOrderRequest())

        orderService.add(order).then(res => {
            if(res.statusCode == 200){
                dispatch(addOrderSuccess(res));
            }
            else{
                addOrderError(res)
            }
        }).catch(error => dispatch(addOrderError(error)));

    };

};