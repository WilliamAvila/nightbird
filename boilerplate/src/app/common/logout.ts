import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'logout',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <button type="button" class="button" (click)="logout()">Logout</button>
    `,
    styles: [require('./logout.scss')]
})
export class Logout {
    constructor(private router: Router) {
    }
    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.router.navigate(['../Login']);
    }
    loggedIn() {
        return tokenNotExpired();
    }
}
