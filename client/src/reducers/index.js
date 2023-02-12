import {combinedReducers} from 'redux'
import { productReducer } from './products.red'

export default combinedReducers({
    products: productReducer,
})