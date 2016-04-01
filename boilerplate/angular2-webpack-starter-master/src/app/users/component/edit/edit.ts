import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {User} from '../../user';
import {UserService} from '../../services/user.service';
import {RouteParams, Router } from 'angular2/router';
import {FORM_DIRECTIVES, FormBuilder,
    ControlGroup, Validators, CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'edit-user',
    template: require('./edit.html'),
    styles: [require('../../../app.scss')],
    providers: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class EditUser implements OnInit, OnDestroy {
    public user: User;
    editForm: ControlGroup;
    constructor(fb: FormBuilder, @Inject(UserService) private userService: UserService,
        private routeParams: RouteParams, private router: Router) {
        this.editForm = fb.group({
            'name': ['', Validators.compose([Validators.required,
                Validators.nullValidator, Validators.minLength(1), Validators.maxLength(30)])],
            'username': ['', Validators.compose([Validators.required,
                Validators.nullValidator, Validators.minLength(1), Validators.maxLength(30)])],
            'email': ['', Validators.compose([Validators.required, Validators.nullValidator])],
            'phone': ['', Validators.maxLength(30)],
            'website': ['', Validators.maxLength(30)],
        });
    }
    ngOnInit() {
        this.user = this.userService.getUser(parseInt(this.routeParams.get('id')));
    }
    ngOnDestroy() { }
    updateUser(user: User) {
        this.userService.update(this.user);
        this.router.navigate(['/Home/User/']);
    }
}
export var isEditable;
