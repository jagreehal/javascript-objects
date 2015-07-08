const assert = require('chai').assert;

describe('Almost everything is an object', function () {
  it('Even an object literal', ()=> {
    let o = {};

    assert.isObject({});
    assert.equal(Object.getPrototypeOf(o), Object.prototype);

    // yikes!
    assert.ok(o.constructor);
  });

  it('Proper way to create empty object', ()=> {
    let o = Object.create(null);

    assert.isObject(o);
    assert.equal(null, Object.getPrototypeOf(o));

    // yay!
    assert.isNotFunction(o.constructor);
  });

});