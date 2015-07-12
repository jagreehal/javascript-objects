const assert = require('chai').assert;

describe('Using Symbol to create private property', () => {
  const secret = Symbol();
  class Device {
    constructor() {
      this[secret] = 'chocoholic';
    }
    getName() {
      return this[secret];
    }
  }

  it('Can only access via function', ()=> {
    let device1 = new Device();

    assert.isUndefined(device1.secret);
    assert.equal(device1.getName(), 'chocoholic');
  });

});
