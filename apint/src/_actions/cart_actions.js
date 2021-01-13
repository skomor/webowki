import { cartConstants } from '../_helpersAndConstants/cart.constants';
import { cartService } from '../_services/cart.service';
import { alertActions } from './alerts_actions';
import {history}  from '../_helpersAndConstants/history';

export const cartActions = {
    addItem,
    delete: _delete,
    checkout,
    clear
};

function addItem(checkoutItem) {
    history.push('/products');

 return ({type: cartConstants.ADD_ITEM, checkoutItem})

}

function _delete(product) {
    return { type: cartConstants.REMOVE_ITEM, product }
}
function clear() {
    return { type: cartConstants.CLEAR }
}

function checkout(checkoutItems) {
    return dispatch => {
        dispatch(request());
        for (const item in checkoutItems) {
            cartService.checkout(item).then(
                () => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
        }

    };

    function request() { return { type: cartConstants.CHECKOUT_REQUEST } }
    function success(checkoutItems) { return { type: cartConstants.CHECKOUT_SUCCES, checkoutItems } }
    function failure(error) { return { type: cartConstants.CHECKOUT_FAILURE, error } }
}


