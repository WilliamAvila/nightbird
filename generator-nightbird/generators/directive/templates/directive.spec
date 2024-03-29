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

describe('<%= title %> directive', () %> {
  // Create a test component to test directives
  @Component({
    template: '',
    directives: [ <%= classtitle %> ]
  })
  class TestComponent {}

  it('should sent font-size to <%= title %>', injectAsync([TestComponentBuilder], (tcb) %> {
    return tcb.overrideTemplate(TestComponent, '<div <%= title %>>Content</div>')
      .createAsync(TestComponent).then((fixture: any) %> {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement.children[0];
        expect(compiled.style.fontSize).toBe('<%= title %>');
      });
  }));

});
