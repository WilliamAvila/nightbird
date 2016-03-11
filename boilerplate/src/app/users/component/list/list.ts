import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';
import {COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {EditUser} from '../edit/edit';
import {DeleteUser} from '../delete/delete';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'user-list',
    template: require('./list.html'),
    providers: [UserService],
    directives: [FORM_DIRECTIVES, EditUser, DeleteUser],
    styles: [require('./list.scss')]
})

export class ListUsers implements OnInit, OnDestroy {
    Users: User[];
    constructor(private userService: UserService) {
        this.Users = Array<User>();
    }
    ngOnInit() {
        this.userService.get().subscribe((res: User[]) => {
            this.Users = res;
        });
    }
    ngOnDestroy() { console.log('ngOnDestroy'); }
}
