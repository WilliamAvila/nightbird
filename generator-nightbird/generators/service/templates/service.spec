import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {<%= classtitle %>} from './<%= title %>';

describe('<%= classtitle %>', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    <%= classtitle %>
  ]);


  it('should have http', inject([ <%= classtitle %> ], (<%= title %>) => {
    expect(!!<%= title %>.http).toEqual(true);
  }));

  it('should get data from the server', inject([ <%= classtitle %> ], (<%= title %>) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    <%= title %>.getData();
    expect(console.log).toHaveBeenCalled();
    expect(<%= title %>.getData()).toEqual({ value: 'AngularClass' });
  }));

});
