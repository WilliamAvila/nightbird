import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import {Injectable, Inject, bind } from 'angular2/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from '../user';
import {API_URL} from '../../common/common.injectables';

@Injectable()
export class UserService {
    users: Observable<User[]>;
    constructor(public http: Http,
        @Inject(API_URL) private apiUrl: string) {
    }
    get(): Observable<User[]> {
        return this.http.get(this.apiUrl)
            .map((response: Response) => {
                let data = <User[]>response.json();
                return data;
            });
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

