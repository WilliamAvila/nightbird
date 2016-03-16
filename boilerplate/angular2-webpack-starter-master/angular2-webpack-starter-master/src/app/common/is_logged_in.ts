import {Injector} from 'angular2/core';
import {appInjector} from './app_injector';
import {Router, ComponentInstruction} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

export const isLoggedIn = (next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = appInjector(); // get the stored reference to the injector
    let router: Router = injector.get(Router);
    // return a boolean or a promise that resolves a boolean
    if (!tokenNotExpired()) {
        router.navigate(['Login']);
        return false;
    }
    return true;
};
