import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CreateUser} from './component/create/create';
import {ListUsers} from './component/list/list';
import {EditUser} from './component/edit/edit';
import {User} from './user';
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
    { path: '/create', component: CreateUser, name: 'CreateUser' },
    { path: '/edit', component: EditUser, name: 'EditUser', data: { user: User } }
])
export class UserComponent {
    constructor() {
    }
}
