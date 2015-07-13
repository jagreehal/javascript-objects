const assert = require('chai').assert;

describe('Can only access private variables in the constructor', () => {
  class Device {
    constructor(name = 'Unknown') {
      var secret = 'chocoholic';
      this.name = name;
      this.getSecret = ()=> {
        return secret;
      };
    }

    getSecretViaPrototype() {
      return secret;
    }
  }

  it('Can access secret property', ()=> {
    let device1 = new Device('device1');
    assert.equal(device1.getSecret(), 'chocoholic');

    assert.isUndefined(device1.secret);
  });
});
