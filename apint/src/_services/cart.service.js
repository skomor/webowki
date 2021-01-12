import {authHeader} from '../_helpersAndConstants/auth-header';
import {config} from '../_helpersAndConstants/config';

export const cartService = {
    checkout,

};

function checkout(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localStorage.getItem('user').id)
    };
    const requestOptionsForItems = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: item
    };

    return fetch(config.apiUrl + '/api/rentals', requestOptions)
        .then(handleResponse, handleError).then(

        )



   /*  fetch(config.apiUrl + '/users/authenticate', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });*/
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