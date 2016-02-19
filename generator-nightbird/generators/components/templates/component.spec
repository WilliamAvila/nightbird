import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


// Load the implementations that should be tested
import {<%= classtitle %>} from './<%= title %>';
import {Title} from '../services/title';

describe('<%= classtitle %>', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Title,
    <%= classtitle %>
  ]);

  it('should have default data', inject([ <%= classtitle %> ], (<%= title %>) => {
    expect(<%= title %>.data).toEqual({ value: '' });
  }));

  it('should have a title', inject([ <%= classtitle %> ], (<%= title %>) => {
    expect(!!<%= title %>.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ <%= classtitle %> ], (<%= title %>) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    <%= title %>.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
