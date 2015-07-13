const assert = require('chai').assert;

describe('Using WeakMap to create private property', () => {
  const secret = new WeakMap();
  class Device {
    constructor() {
      secret.set(this, 'chocoholic');
    }

    getSecret() {
      return secret.get(this);
    }
  }

  it('Can only access via function', ()=> {
    let device1 = new Device();

    assert.isUndefined(device1.secret);
    assert.equal(device1.getSecret(), 'chocoholic');
  });

});
