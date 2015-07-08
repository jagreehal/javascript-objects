const assert = require('chai').assert;

export class Device {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

describe('A simple class', function () {
  it('Can create class', ()=> {
    let device = new Device('Camera');

    assert.equal(device.getName(), 'Camera');
  });
});