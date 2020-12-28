import { GET_SLIDERS_REQUEST, GET_SLIDERS_SUCCESS, GET_SLIDERS_ERROR  } from '../constants/SliderActionType';
import sliderService from './../../api/sliderService';

export const getSlidersRequest = () =>{
    return {
        type: GET_SLIDERS_REQUEST
    }
}

export const getSlidersSuccess = (response) =>{
    return {
        type: GET_SLIDERS_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getSlidersError = (error) =>{
    return {
        type: GET_SLIDERS_ERROR,
        error: {
            ...error
        } 
    }
}

export const fetchSliders = () => {

    return async (dispatch) => {
        dispatch(getSlidersRequest())

        sliderService.getAll().then(res => {
            dispatch(getSlidersSuccess(res));
        }).catch(error => dispatch(getSlidersError(error)));

        
    };

};