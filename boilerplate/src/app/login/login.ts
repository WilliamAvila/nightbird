import {Component, View} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'login',
    directives: [ROUTER_DIRECTIVES],
    template: require('./login.html')
})
export class Login {

    lock = new Auth0Lock('m3xNJ6C4oXkezrkuh3uYKxkDADrxkmEy', 'acklenavenue.auth0.com');

    constructor(public router: Router) { }

    login() {
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            this.router.navigate(['/Home']);
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }
}
