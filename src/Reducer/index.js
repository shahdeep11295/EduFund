import { combineReducers } from "redux";
import register from './register.reducer';
import loder from './loder.reducer'
import product from "./product.reducer"
import getalluser from "./getalluser.reducer"

export default combineReducers({
    register,
    loder,
    product,
    getalluser
})