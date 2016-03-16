import {Component, OnInit, OnDestroy, Inject} from 'angular2/core';
import {} from 'angular2/forms';
import {User} from '../../user';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {Router} from 'angular2/router';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'user-create',
    template: require('./create.html'),
    styles: [require('./create.scss')],
    directives: [FORM_DIRECTIVES],
    providers: [UserService]
})

export class CreateUser implements OnInit, OnDestroy {
    createForm: ControlGroup;
    constructor(fb: FormBuilder, @Inject(UserService) private userService: UserService,
        private router: Router) {
        this.createForm = fb.group({
            'name': ['', Validators.compose([Validators.required,
                Validators.nullValidator, Validators.minLength(1), Validators.maxLength(30)])],
            'username': ['', Validators.compose([Validators.required,
                Validators.nullValidator, Validators.minLength(1), Validators.maxLength(30)])],
            'email': ['', Validators.compose([Validators.required, Validators.nullValidator])],
            'phone': ['', Validators.maxLength(15)],
            'website': ['', Validators.maxLength(30)],
        });
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    createUser(user: User) {
        console.log(user);
        this.userService.add(user);
        this.router.navigate(['/Home/User/']);
    }
}
