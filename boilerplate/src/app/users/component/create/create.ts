import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';

@Component({
    selector: 'user-create',
    template: require('./create.html'),
    styles: [require('./create.scss')]
})

export class CreateUser implements OnInit, OnDestroy {
    constructor() {}
    ngOnInit() {  }
    ngOnDestroy() {  }
}
