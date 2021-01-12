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
 return ({type: cartConstants.ADD_ITEM, checkoutItem})
}

function _delete(id) {
    return { type: cartConstants.REMOVE_ITEM, id }
}
function clear() {
    return { type: cartConstants.CLEAR }
}

function checkout(checkoutItems) {
    return dispatch => {
        dispatch(request());
        cartService.checkout(checkoutItems)
            .then(
                () => {
                    dispatch(success());
                    history.push('/pay');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: cartConstants.CHECKOUT_REQUEST } }
    function success(checkoutItems) { return { type: cartConstants.CHECKOUT_SUCCES, checkoutItems } }
    function failure(error) { return { type: cartConstants.CHECKOUT_FAILURE, error } }
}


