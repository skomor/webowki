import {authHeader} from '../_helpersAndConstants/auth-header';
import {config} from '../_helpersAndConstants/config';
import _ from "lodash";

export const cartService = {
    checkout,
    getRentedByUserId
};
let user = JSON.parse(localStorage.getItem('user'));

function checkout(checkoutItems) {


    var result = checkoutItems.map(function(o) {
        o.userId = user.id;
        return o;
    })
    
    const requestOptions = {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' ,...authHeader()},
        body: JSON.stringify(result)
    };
    return fetch(config.apiUrl + '/api/productRentals', requestOptions)
        .then(handleResponse, handleError);


}

function getRentedByUserId(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,...authHeader()},
    };
    return fetch(config.apiUrl + `/api/productRentals/${userId}`, requestOptions)
        .then(handleResponse, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}