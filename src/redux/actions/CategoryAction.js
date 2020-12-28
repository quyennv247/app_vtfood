import { GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR  } from '../constants/CategoryActionType';
import categoryService from '../../api/categoryService';

export const getCategoriesRequest = () =>{
    return {
        type: GET_CATEGORY_REQUEST
    }
}

export const getCategoriesSuccess = (response) =>{
    return {
        type: GET_CATEGORY_SUCCESS,
        data: {
            ...response
        }
    }
}

export const getCategoriesError = (error) =>{
    return {
        type: GET_CATEGORY_ERROR,
        error: {
            ...error
        } 
    }
}

export const fetchCategories = () => {

    return async (dispatch) => {
        dispatch(getCategoriesRequest())

        categoryService.getCategories(0).then(res => {
            dispatch(getCategoriesSuccess(res));
        }).catch(error => dispatch(getCategoriesError(error)));

    };

};