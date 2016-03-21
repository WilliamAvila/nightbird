import {HTTP_PROVIDERS, Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable, Inject, bind } from 'angular2/core';
import {Observable, BehaviorSubject, Observer} from 'rxjs';
import {User} from '../user';
import {API_URL} from '../../common/common.injectables';
import {AAHttpService} from '../../common/service/http.service';

@Injectable()
export class UserService {
    public users: Observable<User[]>;
    private _usersObserver: Observer<User[]>;
    private _dataStore: {
        users: User[]
    };
    constructor(private httpService: AAHttpService) {
        this.users = new Observable(observer => {
            this._usersObserver = observer;
        }).share();
        this._dataStore = { users: [] };
    }
    getAllUsers() {
        if (this._dataStore.users.length === 0) {
            this.httpService.get('/users')
                .map(response => response.json()).subscribe(data => {
                    this._dataStore.users = data;
                    this._usersObserver.next(this._dataStore.users);
                }, error => console.log('Could not load users.'));
        }
    }
    add(user: User) {
        this.httpService.post(JSON.stringify(user), '/users')
            .map(response => response.json()).subscribe(data => {
                this._dataStore.users.push(data);
                this._usersObserver.next(this._dataStore.users);
            }, error => console.log('Could not create user.'));
    }
    update(user: User) {
        this.httpService.put(JSON.stringify(user), '/users/' + user.id)
            .map(response => response.json()).subscribe(data => {
                this._dataStore.users.forEach((todo, i) => {
                    if (todo.id === data.id) { this._dataStore.users[i] = data; }
                });

                this._usersObserver.next(this._dataStore.users);
            }, error => console.log('Could not update user.'));
    }
    getUser(id: number): User {
        return this._dataStore.users[this._dataStore.users.findIndex(user =>
            user.id === id
        )];
    }
    delete(user: User) {
        this.httpService.delete('/users/' + user.id)
            .subscribe(response => {
                this._dataStore.users.forEach((t, i) => {
                    if (t.id === user.id) { this._dataStore.users.splice(i, 1); }
                });

                this._usersObserver.next(this._dataStore.users);
            }, error => console.log('Could not delete user.'));
    }
}
export var UserServiceInjectables: Array<any> = [
    bind(UserService).toClass(UserService)
];
