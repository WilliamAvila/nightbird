import {Component} from 'angular2/core';
import {Logout} from '../common/logout';

@Component({
    selector: 'aa-top-nav',
    directives: [Logout],
    template: require('./aa-top-nav.html'),
    styles: [require('./top_nav.scss')]
})

export class TopNav {
    constructor() { }
}
