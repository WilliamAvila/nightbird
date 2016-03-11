import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';

@Component({
    selector: 'delete-user',
    template: `<button type="button" class="alert button">Delete</button>`,
    styles: [require('../../../app.scss')]
})

export class DeleteUser implements OnInit, OnDestroy {
    constructor() {}
    ngOnInit() {  }
    ngOnDestroy() { }
}
