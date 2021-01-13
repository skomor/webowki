import {cartConstants} from "../_helpersAndConstants/cart.constants";

const storage = localStorage.getItem('checkoutItems') ? JSON.parse(localStorage.getItem('checkoutItems')) : [];
const initialState = { checkoutItems: storage, checkout: false };



export function CartReducer (state= initialState, action){
    const Storage = (cartItems) => {
        localStorage.setItem('checkoutItems', JSON.stringify(cartItems.length > 0  ? cartItems: []));
    }
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            state.checkoutItems.push(action.checkoutItem);
            Storage(state.checkoutItems)

            return {
                checkoutItems: [...state.checkoutItems]
            }
        case cartConstants.REMOVE_ITEM:
            Storage([...state.checkoutItems.filter(item => item != action.product)]);
            return {
                checkoutItems: [...state.checkoutItems.filter(item => item != action.product)]
            }
        case cartConstants.CLEAR:
            Storage([]);
            return {
                date: state.date ? state.date : null,
                checkoutItems: []
            }
        case cartConstants.CHECKOUT_REQUEST:
            Storage([...state.checkoutItems]);
            return {
                checkout: true,
                checkoutItems: [...state.checkoutItems]
            }
        case cartConstants.CHECKOUT_SUCCES:
            return {
                checkout: false,
                date: action.date,
                checkoutItems: [...state.checkoutItems]
            }
        case cartConstants.GET_RENTED_BY_USER_ID_SUCCES:
            return {
                checkout: state.checkout,
                date: state.date,
                checkoutItems: [...state.checkoutItems],
                rentedItems: action.rentedItems
            }
        case cartConstants.GET_RENTED_BY_USER_ID_FAILURE:
            return {
                checkout: state.checkout,
                date: state.date,
                checkoutItems: [...state.checkoutItems],
                rentedItems: []
            }
        case cartConstants.GET_RENTED_BY_USER_ID_REQUEST:
            return {
                checkout: state.checkout,
                date: state.date,
                checkoutItems: [...state.checkoutItems],
                rentedItems: []
            }

        default:
            return state
    }
}