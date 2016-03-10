import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CreateUser} from './create/create';
import {ListUsers} from './list/list';
/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'users',
    directives: [...ROUTER_DIRECTIVES],
    template: `
    <main>
      <router-outlet>
      </router-outlet>
    </main>
  `
})
@RouteConfig([
    { path: '/', component: ListUsers, name: 'ViewUsers', useAsDefault: true },
    { path: '/create', component: CreateUser, name: 'CreateUser' }
])
export class UserComponent {
    constructor() { }
}
