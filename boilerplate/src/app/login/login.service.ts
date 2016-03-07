import {Injectable} from 'angular2/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class IsLoggedService {
    public Logged: Subject<boolean>;
    constructor() {
        this.Logged = new BehaviorSubject<boolean>(false);
    }
    loggedIn() {
        this.Logged.next(true);
    }
    loggedOut() {
        this.Logged.next(false);
    }
}
