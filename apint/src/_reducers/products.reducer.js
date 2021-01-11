import {productConstants} from "../_helpersAndConstants/product.constatns";

export function products(state = {}, action) {
    switch (action.type) {
        case productConstants.PRODUCTS_GETALL_REQUEST:
            return {
                loading: true
            };
        case productConstants.PRODUCTS_GETALL_FAILURE:
            return {
                error: action.error
            };
        case productConstants.PRODUCTS_GETALL_SUCCESS: {
            return {
                items: action.items
            }
        }
        default:
            return state
    }
}