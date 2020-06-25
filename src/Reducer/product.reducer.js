import {PRODUCT_DETAILS} from '../utils/constant'
export default function(state={productdata:''}, action){
    switch(action.type){
        
        case PRODUCT_DETAILS:
            return{
                ...state,
                productdata:action.payload,
            }
        default:
            return state
    }
}