import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from '../user';

@Injectable()
export class UserService {
    serviceData: Object[];
    constructor(public http: Http) {
    }
    get(): Observable<User[]> {
        return this.http.get('http://jsonplaceholder.typicode.com/users')
            .map((response: Response) => {
                let data = <User[]>response.json();
                return data;
            });
    }
}
