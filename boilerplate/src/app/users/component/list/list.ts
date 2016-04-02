import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {User} from '../../user';
import {COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {EditUser, isEditable} from '../edit/edit';
import {DeleteUser} from '../delete/delete';
import {UserService} from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'user-list',
    template: require('./list.html'),
    directives: [FORM_DIRECTIVES, EditUser, DeleteUser, ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    styles: [require('./list.scss')],
})

export class ListUsers implements OnInit, OnDestroy {
    users: User[];
    subscription: Subscription;
    constructor( @Inject(UserService) private userService: UserService, private router: Router) {
    }
    ngOnInit() {
        this.subscription = this.userService.users.subscribe(data => this.users = data);
        this.userService.getAllUsers();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    goToCreateUser(event: any) {
        this.router.navigateByUrl('home/users/create');
    }
    goToEditUser(id: number) {
        this.router.navigate(['/Home/User/EditUser', { id: id }]);
    }
}
