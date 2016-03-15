import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CreateUser} from './component/create/create';
import {ListUsers} from './component/list/list';
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
    { path: '/list', component: ListUsers, name: 'ListUsers', useAsDefault: true },
    { path: '/create', component: CreateUser, name: 'CreateUser' }
])
export class UserComponent {
    constructor() {
     }
}
