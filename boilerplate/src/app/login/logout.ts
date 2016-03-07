import {Component, View, OnInit} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {IsLoggedService} from './login.service';

declare var Auth0Lock;

@Component({
    selector: 'logout',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <button *ngIf="!isLogged" (click)="logout()">Logout</button>
    `
})
export class Logout implements OnInit {
    isLogged: boolean;
    constructor(private router: Router, private isLoggedService: IsLoggedService) {
    }
    ngOnInit() {
        this.isLoggedService.Logged.subscribe((data: boolean) => {
            this.isLogged = data;
            console.log(data);
        });
    }
    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.isLoggedService.loggedOut();
        this.router.navigate(['./Login']);
    }
    loggedIn() {
        return tokenNotExpired();
    }
}
