const assert = require('chai').assert;

describe('Almost everything is an object', function () {
  it('Object literal', ()=> {
    let o = {};

    assert.isObject({});
    assert.deepEqual(Object.getPrototypeOf(o), Object.prototype);

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

  it('A function can return an object', ()=> {
    let o = Object.create(null);

    assert.isObject(o);
    assert.deepEqual(null, Object.getPrototypeOf(o));
  });

  it('A function constructor', ()=> {
    function O(name) {
      this.name = name;
      this.getName = ()=> {
        return this.name;
      };
    }

    let o = new O('x');
    assert.equal(o.getName(), 'x');
    assert.isObject(o);
    assert.deepEqual(Object.getPrototypeOf(o), Object.prototype);
  });

  it('A function constructor v2', ()=> {
    function O(name) {
      this.name = name;
    }

    O.prototype.getName = function () {
      return this.name;
    };

    let o = new O('x');
    assert.equal(o.getName(), 'x');
    assert.isObject(o);
    assert.deepEqual(Object.getPrototypeOf(o), O.prototype);
  });

  it('Object.create', ()=> {
    const o = {
      getName () {
        return this.name;
      }
    };

    let o1 = Object.create(o);
    o1.name = 'x';

    assert.equal(o1.getName(), 'x');
    assert.isObject(o1);
    assert.deepEqual(Object.getPrototypeOf(o1), o);
  });

});