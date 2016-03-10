import {Component, OnInit, OnDestroy} from 'angular2/core';
import {User} from '../../user';

@Component({
    selector: 'edit-user',
    template: `<button type="button" class="secondary button">Edit</button>`,
    styles: [require('../../../app.scss')]
})

export class EditUser implements OnInit, OnDestroy {
    constructor() {}
    ngOnInit() { console.log('ngOnInit'); }
    ngOnDestroy() { console.log('ngOnDestroy'); }
}
