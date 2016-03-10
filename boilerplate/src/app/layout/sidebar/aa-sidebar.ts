
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'aa-sidebar',
    directives: [ROUTER_DIRECTIVES],
    template: require('./aa-sidebar.html'),
    styles: [require('./aa-sidebar.scss')]
})
export class Sidebar {
    constructor(private router: Router) { }
    goToCreateUser() {
        this.router.navigate(['../users/create/create']);
    }
}
