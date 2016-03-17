import {bind } from 'angular2/core';

export var API_URL: string = 'http://jsonplaceholder.typicode.com/users';

export var CommonInjectables: Array<any> = [
    bind(API_URL).toValue(API_URL)
];
