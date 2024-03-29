import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {isLoggedIn} from '../../common/is_logged_in';
import {Title} from '../services/title';
import {XLarge} from '../directives/x-large';
import {ROUTER_DIRECTIVES,
    ROUTER_BINDINGS,
    Router, RouteConfig, CanActivate, ComponentInstruction,
    RouterOutlet, RouterLink} from 'angular2/router';
import { AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Logout} from '../../common/logout';
import {Sidebar} from '../../layout/sidebar/aa-sidebar';
import {TopNav} from '../../layout/top_nav/aa-top-nav';
import {UserComponent} from '../../users/user.component';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'app'
    selector: 'aa-home',  // <home></home>
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        ...FORM_DIRECTIVES, RouterOutlet, RouterLink,
        Logout,
        Sidebar,
        TopNav,
        XLarge
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./home.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./home.html')
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isLoggedIn(next, previous);
})
@RouteConfig([
    { path: '/users/...', component: UserComponent, name: 'User', useAsDefault: true },
])
export class Home {
    // Set our default values
    data = { value: '' };
    initialized: boolean;
    // TypeScript public modifiers
    constructor(public title: Title) {
    }
}
