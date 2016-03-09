import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {isLoggedIn} from '../../common/is_logged_in';
import {Title} from '../services/title';
import {XLarge} from '../directives/x-large';
import {Router, CanActivate, ComponentInstruction} from 'angular2/router';
import { AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Menu} from '../../menu/menu';
import {TopNav} from '../../top_nav/top_nav';

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
        ...FORM_DIRECTIVES, Menu, TopNav,
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

export class Home {
    // Set our default values
    data = { value: '' };
    initialized: boolean;
    // TypeScript public modifiers
    constructor(public title: Title) {
    }
}
