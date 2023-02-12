import { PRODUCTS_RECEIVED, PRODUCT_RECEIVED, REVIEW_ADDED, SET_IS_LOADING, SET_PAGE_NUMBER, SET_PAGE_SIZE } from "../actions/products/type"

const defaultState = {
    products: [],
    isLoading: false,
    pageNumber: 1,
    pageSize: 5,
    product: {},
}

export const productReducer = (state = {}, action) => {
    console.log('at reducer: ', action)
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case PRODUCTS_RECEIVED:
            return {
                ...state,
                products: action.payload
            }
        case REVIEW_ADDED:
        case PRODUCT_RECEIVED:
            return {
                ...state,
                product: action.payload
            }
        case SET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.payload
            }
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload
            }
        default:
            return {
                ...state
            }
    }
}