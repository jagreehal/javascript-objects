const assert = require('chai').assert;

describe('Every object inherits from a prototype', function () {
  it('Object literal', ()=> {
    let o = {};

    assert.isObject({});
    assert.deepEqual(Object.getPrototypeOf(o), Object.prototype);

    // yikes!
    assert.ok(o.toString);
  });

  it('Proper way to create empty object', ()=> {
    let o = Object.create(null);

    assert.isObject(o);
    assert.equal(Object.getPrototypeOf(o), null);

    // yay!
    assert.notOk(o.toString);
  });

  it('Even a function has a prototype', ()=> {
    let f = function () {
    };

    assert.isFunction(f);
    assert.deepEqual(Object.getPrototypeOf(f), Function.prototype);

    assert.ok(f.prototype);
  });

});