import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Utils from './src/lib/Utils';
import App from './src/App';

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<App />).contains(<div className="foo" />)).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<App />).is('.foo')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<App />).find('.foo').length).to.equal(1);
  });
});
