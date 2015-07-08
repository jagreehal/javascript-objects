const assert = require('chai').assert;
import {default as ES5Bar} from './es5';
import {default as ClassBar} from './es2015';
import {default as ObjectBar} from './objectcreate';

describe('They should have the same behaviour', () => {
  it('Class', () => {
    let b1 = new ClassBar('b1');
    let b2 = new ClassBar('b2');

    assert.equal('Hello, I am b1.', b1.speak());
    assert.equal('Hello, I am b2.', b2.speak());
  });

  it('ES5', () => {
    let b1 = new ES5Bar('b1');
    let b2 = new ES5Bar('b2');

    assert.equal('Hello, I am b1.', b1.speak());
    assert.equal('Hello, I am b2.', b2.speak());
  });

  it('Object.create', () => {
    let b1 = Object.create(ObjectBar);
    b1.init('b1');

    let b2 = Object.create(ObjectBar);
    b2.init('b2');

    assert.equal('Hello, I am b1.', b1.speak());
    assert.equal('Hello, I am b2.', b2.speak());
  });
});