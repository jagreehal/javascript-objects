const assert = require('chai').assert;

describe('Can modify the class even after it was used', () => {
  class Device {
    constructor(name) {
      this.name = name || 'Unknown';
      this.secret = 'chocoholic';
    }
  }

  it('Can access property', ()=> {

    let device1 = new Device('device1');

    assert.isDefined(device1.secret);
  });

});
