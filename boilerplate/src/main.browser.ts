/*
 * Providers provided by Angular
 */
import {bootstrap} from 'angular2/platform/browser';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
import {App, APP_PROVIDERS} from './app';
import 'script!jquery';
import 'script!foundation-sites';
import {CommonInjectables} from './app/common/common.injectables';
import {UserServiceInjectables} from './app/users/services/user.service';
import {AAHttpServiceInjectables} from './app/common/service/http.service';
import {appInjector} from './app/common/app_injector';
import {ComponentRef} from 'angular2/core';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

    return bootstrap(App, [
        ...ENV_PROVIDERS,
        ...PROVIDERS,
        ...DIRECTIVES,
        ...PIPES,
        ...APP_PROVIDERS,
        CommonInjectables,
        UserServiceInjectables,
        AAHttpServiceInjectables,
    ]).then((appRef: ComponentRef) => {
        appInjector(appRef.injector);
    })
        .catch(err => console.error(err));

}





/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
} else {
    // bootstrap when documetn is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
