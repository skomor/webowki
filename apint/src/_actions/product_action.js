
import { alertActions } from './alerts_actions';
import {productConstants} from "../_helpersAndConstants/product.constatns";
import {productService} from "../_services/product.service";

export const productActions = {
    getById,
    getAll,
  /*  create,
    update,
    delete:_delete*/
};

function getById(id){
    return dispatch => {
        dispatch(request());

        productService.getById(id)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/Home');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: productConstants.PRODUCTS_GETBYID_REQUEST } }
    function success(product) { return { type: productConstants.PRODUCTS_GETBYID_SUCCESS, product } }
    function failure(error) { return { type: productConstants.PRODUCTS_GETBYID_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: productConstants.PRODUCTS_GETALL_REQUEST } }
    function success(items) { return { type: productConstants.PRODUCTS_GETALL_SUCCESS, items } }
    function failure(error) { return { type: productConstants.PRODUCTS_GETALL_FAILURE, error } }
}
