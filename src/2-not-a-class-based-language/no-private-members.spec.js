const assert = require('chai').assert;

describe('Can access all class properties', () => {
  class Device {
    constructor(name = 'Unknown') {
      this.name = name;
      this.secret = 'chocoholic';
    }
  }

  it('Can access secret property', ()=> {
    let device1 = new Device('device1');
    assert.isDefined(device1.secret);
  });
});

describe('Function constructors allow for private properties', () => {
  function Device(name = 'Unknown') {
    const secret = ' chocoholic';
    this.name = name;
  }

  it('Cannot access secret property', ()=> {
    let device1 = new Device('device1');
    assert.isUndefined(device1.secret);
  });
});
