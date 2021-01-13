import { cartConstants } from '../_helpersAndConstants/cart.constants';
import { cartService } from '../_services/cart.service';
import { alertActions } from './alerts_actions';
import {history}  from '../_helpersAndConstants/history';
import _ from 'lodash'

export const cartActions = {
    addItem,
    delete: _delete,
    checkout,
    clear,
    getRentedByUserId
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
function getRentedByUserId(userId) {

    return dispatch => {
        dispatch(request());

        cartService.getRentedByUserId(userId).then(
            (rentedItems) => {
                dispatch(success(rentedItems));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };
    function request() { return { type: cartConstants.GET_RENTED_BY_USER_ID_REQUEST } }
    function success(rentedItems) { return { type: cartConstants.GET_RENTED_BY_USER_ID_SUCCES, rentedItems } }
    function failure(error) { return { type: cartConstants.GET_RENTED_BY_USER_ID_FAILURE, error } }
}

function checkout(checkoutItems,date) {



    return dispatch => {
        dispatch(request());

            cartService.checkout(checkoutItems).then(
                () => {
                    dispatch(success(date));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );


    };

    function request() { return { type: cartConstants.CHECKOUT_REQUEST } }
    function success(date) { return { type: cartConstants.CHECKOUT_SUCCES, date } }
    function failure(error) { return { type: cartConstants.CHECKOUT_FAILURE, error } }
}


