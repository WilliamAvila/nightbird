import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../user';

@Component({
    selector: 'user-view',
    template: require('./view.html'),
    styles: [require('./view.scss')]
})

export class ViewUsers implements OnInit, OnDestroy {
    constructor() {}
    ngOnInit() { console.log('ngOnInit'); }
    ngOnDestroy() { console.log('ngOnDestroy'); }
}
