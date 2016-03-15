import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'delete-user',
    inputs: ['user'],
    template: `<button (click)="deleteUser()"
     type="button" class="alert button">Delete</button>`,
    styles: [require('../../../app.scss')]
})

export class DeleteUser implements OnInit, OnDestroy {
    public user: User;
    constructor(private userService: UserService) { }
    ngOnInit() { }
    ngOnDestroy() { }
    deleteUser() {
        this.userService.delete(this.user);
    }
}
