import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {User} from '../../user';
import {COMMON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {EditUser, isEditable} from '../edit/edit';
import {DeleteUser} from '../delete/delete';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'user-list',
    template: require('./list.html'),
    directives: [FORM_DIRECTIVES, EditUser, DeleteUser, ROUTER_DIRECTIVES],
    styles: [require('./list.scss')]
})

export class ListUsers implements OnInit, OnDestroy {
    Users: User[];
    private GetUsers: Subscription;
    constructor(@Inject(UserService) private userService: UserService, private router: Router) {
        this.Users = Array<User>();
    }
    ngOnInit() {
        this.GetUsers = this.userService.get().subscribe((res: User[]) => {
            this.Users = res;
        });
    }
    ngOnDestroy() { this.GetUsers.unsubscribe(); }
    goToCreateUser(event: any) {
        this.router.navigateByUrl('home/users/create');
    }
    goToEditUser(user: User) {
        this.router.navigate(['/Home/User/EditUser', { user: user }]);
    }
}
