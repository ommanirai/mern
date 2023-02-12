import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// centralized store contents goes here
// application state maintain

const middleWare = [thunk]

const initialState = {
    // userData: [],
    // notificationData: [],
    // notificationIsLoading: false,
    // userIsLoading: false,
    // productData: [],

    // user: {
    //     users: [],
    //     isLoading: false
    // },
    // notification: {
    //     notifications: [],
    //     isLoading: false
    // },
    products: {
        products: [],
        isLoading: false,
        pageNumber: 1,
        pageSize: 5
    }
}

export const store = createStore(rootReducer, initialState, applyMiddleware(...middleWare))