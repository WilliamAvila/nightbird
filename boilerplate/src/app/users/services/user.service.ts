import {HTTP_PROVIDERS, Http, Response } from 'angular2/http';
import {Injectable, Inject, bind } from 'angular2/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from '../user';
import {API_URL} from '../../common/common.injectables';

@Injectable()
export class UserService {
    serviceData: Object[];
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
}

