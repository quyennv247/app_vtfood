import { GET_SLIDERS_REQUEST, GET_SLIDERS_SUCCESS, GET_SLIDERS_ERROR  } from '../constants/SliderActionType';

const initialState = {
    data: [],
    loading: true,
    error: null
}

export const sliderReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SLIDERS_REQUEST:
            return {
                ...state,
                data: [],
                loading: true
            };
        case GET_SLIDERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case GET_SLIDERS_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};


export default sliderReducer;