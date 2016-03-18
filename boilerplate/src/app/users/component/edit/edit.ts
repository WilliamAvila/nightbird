import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {User} from '../../user';
import {UserService} from '../../services/user.service';
import {RouteParams, Router, CanReuse, ComponentInstruction, OnReuse } from 'angular2/router';
import {FORM_DIRECTIVES, FormBuilder,
    ControlGroup, Validators, CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'edit-user',
    template: require('./edit.html'),
    styles: [require('../../../app.scss')],
    providers: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class EditUser implements OnInit, OnDestroy, CanReuse, OnReuse {
    public user: User;
    hola: string;
    editForm: ControlGroup;
    constructor(fb: FormBuilder, @Inject(UserService) private userService: UserService,
        private routeParams: RouteParams, private router: Router) {
            console.log('here constructor');
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
        this.user = JSON.parse(JSON.stringify(this.routeParams.get('user')));
    }
    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) { return false; }
    routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        this.user = JSON.parse(JSON.stringify(next.params['user']));
    }
    ngOnDestroy() { }
    updateUser(user: User) {
        console.log(this.user);
        this.userService.update(this.user);
        this.router.navigate(['/Home/User/']);
    }
}
export var isEditable;
