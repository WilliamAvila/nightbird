/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {AppState} from './app.service';
import {RouterActive} from './router-active';
import {Home} from './home/components/home';
import {Login} from './login/login';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'aa-app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  styles: [],
  template: `
    <header>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
    </footer>

    <pre>this.appState.state = {{ appState.state | json }}</pre>
  `
})
@RouteConfig([
  { path: '/', redirectTo: ['Home'] },
    { path: '/login', component: Login, name: 'Login', useAsDefault: true },
    {path: '/home/...', component: Home, name: 'Home', },
    // Async load a component using Webpack's require with es6-promise-loader
    { path: '/**', redirectTo: ['Home'] },
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
