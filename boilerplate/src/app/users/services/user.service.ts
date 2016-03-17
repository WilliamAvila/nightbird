import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import {Injectable, Inject, bind } from 'angular2/core';
import {Observable, BehaviorSubject, Observer} from 'rxjs';
import {User} from '../user';
import {API_URL} from '../../common/common.injectables';

@Injectable()
export class UserService {
    public users: Observable<User[]>;
    private _usersObserver: Observer<User[]>;
    private _dataStore: {
        users: User[]
    };
    constructor(public http: Http,
        @Inject(API_URL) private apiUrl: string) {
        this.users = new Observable(observer => {
            this._usersObserver = observer;
        }).share();
        this._dataStore = { users: [] };
    }
    load() {
        this.http.get(this.apiUrl)
            .map(response => response.json()).subscribe(data => {
                this._dataStore.users = data;
                this._usersObserver.next(this._dataStore.users);
            }, error => console.log('Could not load users.'));
    }
    add(user: User) {
        this.http.post(this.apiUrl, JSON.stringify(user))
            .subscribe((response: Response) => {
                console.log(<User[]>response.json());
            });
    }
    update(user: User) {
        this.http.put(this.apiUrl + '/' + user.id, JSON.stringify(user))
            .subscribe((response: Response) => {
                console.log(<User[]>response.json());
            });
    }
    delete(user: User) {
        this.http.delete(this.apiUrl + '/' + user.id)
            .subscribe((response: Response) => {
                console.log(<User[]>response.json());
            });
    }
}
export var UserServiceInjectables: Array<any> = [
    bind(UserService).toClass(UserService)
];
