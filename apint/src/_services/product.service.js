import { authHeader } from '../_helpersAndConstants/auth-header';
import {  config } from '../_helpersAndConstants/config';

export const productService = {
    getById,
    getAll,
    create,
    update,
    delete:_delete

};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/products', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/products/' + id, requestOptions).then(handleResponse, handleError);
}

function update(product) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(config.apiUrl + '/api/products/' + product.id, requestOptions).then(handleResponse, handleError);
}
function create(product) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(config.apiUrl + '/api/products', requestOptions).then(handleResponse, handleError);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/products/' + id, requestOptions).then(handleResponse, handleError);
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