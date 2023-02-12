import { handleError } from "../../util/errorHandler"
import { httpClient } from "../../util/httpClient"
import { PRODUCTS_RECEIVED, PRODUCT_RECEIVED, REVIEW_ADDED, SET_IS_LOADING, SET_PAGE_NUMBER, SET_PAGE_SIZE } from "./type"

// export const fetchProduct_ac = (params) =>{
//     // return ({


//     // })
//     return 
// }


// function fetchProduct_ac(condition) {
//     return function(dispatch){
//         // delay action dispatch
//     }
// }

// fetch products actions
export const fetchProduct_ac = params => dispatch => {
    console.log('at action file', params)
    dispatch({
        type: SET_IS_LOADING,
        payload: true
    })
    this.setState({
        isLoading: true
    })
    httpClient.GET('/product', true, params)
        .then(response => {
            dispatch({
                type: PRODUCTS_RECEIVED,
                payload: response.data
            })
        })
        .catch(err => {
            handleError(err)
        })
        .finally(() => {
            dispatch({
                type: SET_IS_LOADING,
                payload: false
            })
        })
}

// fetch single product action
export const fetchSingleProduct_ac = id => dispatch => {
    // console.log('at action file', params)
    dispatch({
        type: SET_IS_LOADING,
        payload: true
    })
    this.setState({
        isLoading: true
    })
    httpClient.GET(`/product/${id}`, true)
        .then(response => {
            dispatch({
                type: PRODUCT_RECEIVED,
                payload: response.data
            })
        })
        .catch(err => {
            handleError(err)
        })
        .finally(() => {
            dispatch({
                type: SET_IS_LOADING,
                payload: false
            })
        })
}


export const addReview_ac = (productId, data) => dispatch => {
    httpClient.POST(`/product/add-review/${productId}`, data, true)
        .then(response => {
            // assuming response will have entire product object
            dispatch({
                type: REVIEW_ADDED,
                payload: response.data
            })
        })
        .catch(err => {
            handleError(err)
        })
}

export const changePageNumber_ac = (pageNumber) => dispatch => {
    dispatch({
        type: SET_PAGE_NUMBER,
        payload: pageNumber
    })
}

export const changePageSize_ac = (pageSize) => dispatch => {
    dispatch({
        type: SET_PAGE_SIZE,
        payload: pageSize
    })
}