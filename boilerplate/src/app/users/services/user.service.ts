import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from '../user';

@Injectable()
export class ComponentService {
    serviceData: Object[];
    constructor(public http: Http) {
    }
    get(): Observable<any> {
        return this.http.get('http://jsonplaceholder.typicode.com/posts/1')
            .map((response: Response) => {
                return (<any>response.json()).items.map(item => {
                    return new User(item.name, item.lastName, item.age, item.id);
                });
            });
    }
}