import { Component } from 'react';
import Services from '../config/Services';
import { checkSessionTimeout } from '../utilities/AuthService';
import axios from 'axios';

var getServices = new Services();
var identity = getServices.state.identity;

export function RetrieveRequest(url, paging = {}, column = [], criteria = {}, sort = {}) {
    checkSessionTimeout();
    var data = { identity, paging, parameter : { column, criteria, sort } };
    return BaseRequest('POST', url, data);
}

export function SaveRequest(url, data = {}, fileData = '') {
    checkSessionTimeout();
    data = { identity, parameter: { data } };
    if (typeof fileData === 'object') {
        //request for upload image
        fileData.append("request", JSON.stringify(data));
        return BaseRequest('POST', url, fileData);
    }else{
        return BaseRequest('POST', url, data);
    }
}

export function DetailRequest(url, data = {}) {
    checkSessionTimeout();
    data = { identity, parameter: { data } };
    return BaseRequest('POST', url, data);
}

export function DeleteRequest(url, data = {}) {
    checkSessionTimeout();
    if (window.confirm("Are you sure?")) {
        data = { identity, parameter: { data } };
        return BaseRequest('POST', url, data);
    }
}

export function RequestWithoutAuth(url, data = {}) {
    return BaseRequest('POST', url, data);
}

function BaseRequest(method, url, data = {}) {
    if (method !== 'GET') {
        return axios.post(url, data).then((response) => {
            return response.data;
        });
    } else {
        return axios.get(url).then((response) => {
            return response.data;
        });
    }
}
