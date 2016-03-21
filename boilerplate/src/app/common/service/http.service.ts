import {Injectable, Inject, bind} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import {Headers, RequestOptions, RequestOptionsArgs, RequestMethod, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {API_URL} from '../common.injectables';

@Injectable()
export class AAHttpService {
    constructor(public authHttp: AuthHttp, @Inject(API_URL) private apiUrl: string) { }

    get(resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.get(this.apiUrl + resource, this.getOptions(options));
    }

    post(body: string, resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.post(this.apiUrl + resource, body, this.getOptions(options));
    }

    put(body: string, resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.put(this.apiUrl + resource, body, this.getOptions(options));
    }

    delete(resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.delete(this.apiUrl + resource, this.getOptions(options));
    }

    patch(body: string, resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.patch(this.apiUrl + resource, body, this.getOptions(options));
    }

    head(resource?: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.authHttp.head(this.apiUrl + resource, this.getOptions(options));
    }

    private getOptions(options?: RequestOptionsArgs) {
        let headers: Headers = new Headers();
        let opts: RequestOptions = new RequestOptions();
        opts = opts.merge(options);
        headers.append('Content-Type', 'application/json');
        opts.headers = headers;
        return opts;
    }
}

export var AAHttpServiceInjectables: Array<any> = [
    bind(AAHttpService).toClass(AAHttpService)
];
