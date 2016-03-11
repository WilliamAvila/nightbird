import {Component, OnInit, OnDestroy} from 'angular2/core';
import {} from 'angular2/forms';
import {User} from '../../user';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup } from 'angular2/common';

@Component({
    selector: 'user-create',
    template: require('./create.html'),
    styles: [require('./create.scss')],
    directives: [FORM_DIRECTIVES]
})

export class CreateUser implements OnInit, OnDestroy {
    createForm: ControlGroup;
    constructor(fb: FormBuilder) {
        this.createForm = fb.group({
            'name': [''],
            'username': [''],
            'email': [''],
            'phone': [''],
            'website': [''],
        });
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    createUser(value: string) {
        console.log('you submitted value: ', value);
    }
}
