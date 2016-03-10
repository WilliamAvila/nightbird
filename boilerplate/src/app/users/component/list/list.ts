import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';
import {COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {EditUser} from '../edit/edit';
import {DeleteUser} from '../delete/delete';

@Component({
    selector: 'user-list',
    template: require('./list.html'),
    directives: [FORM_DIRECTIVES, EditUser, DeleteUser],
    styles: [require('./list.scss')]
})

export class ListUsers implements OnInit, OnDestroy {
    Users: User[];
    constructor() {
        this.Users = Array<User>();
    }
    ngOnInit() {
        this.Users[0] = new User('Dante', 'Dubon', 19, '0');
        this.Users[1] = new User('Edward', 'Siwady', 20, '1');
    }
    ngOnDestroy() { console.log('ngOnDestroy'); }
}
