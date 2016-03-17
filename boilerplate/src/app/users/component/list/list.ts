import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {User} from '../../user';
import {COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {EditUser, isEditable} from '../edit/edit';
import {DeleteUser} from '../delete/delete';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'user-list',
    template: require('./list.html'),
    directives: [FORM_DIRECTIVES, EditUser, DeleteUser, ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    styles: [require('./list.scss')],
})

export class ListUsers implements OnInit, OnDestroy {
    users: Observable<User[]>;
    constructor(@Inject(UserService) private userService: UserService, private router: Router) {
    }
    ngOnInit() {
        this.users = this.userService.users;
        this.userService.load();
    }
    ngOnDestroy() { }
    goToCreateUser(event: any) {
        this.router.navigateByUrl('home/users/create');
    }
    goToEditUser(user: User) {
        this.router.navigate(['/Home/User/EditUser', { user: user }]);
    }
}
