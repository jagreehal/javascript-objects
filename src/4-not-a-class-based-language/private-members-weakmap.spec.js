const assert = require('chai').assert;

describe('Using WeakMap to create private property', () => {
  const secret = new WeakMap();
  class Device {
    constructor() {
      secret.set(this, 'chocoholic');
    }

    getName() {
      return secret.get(this);
    }
  }

  it('Can only access via function', ()=> {
    let device1 = new Device();

    assert.isUndefined(device1.secret);
    assert.equal('chocoholic', device1.getName());
  });

});
