const assert = require('chai').assert;

describe('Can modify the class even after it was used', () => {
  class Device {
    constructor(name) {
      this.name = name || 'Unknown';
    }

    getName() {
      return this.name;
    }
  }

  it('Can add functions!', ()=> {

    let device1 = new Device('device1');
    let device2 = new Device('device2');

    assert.isNotFunction(device1.anotherFunction);

    Device.prototype.anotherFunction = ()=> {
    };

    assert.isFunction(device1.anotherFunction);
    assert.equal(device1.anotherFunction, device2.anotherFunction);
  });

});
