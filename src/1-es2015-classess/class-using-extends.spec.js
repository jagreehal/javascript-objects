const assert = require('chai').assert;

class Device {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Camera extends Device {
  getName() {
    return `Parent returns ${super.getName()}`;
  }
}

describe('Using extends', function () {
  it('Should be able to inherit from a class', ()=> {
    let camera = new Camera('Camera');

    assert.equal(camera.name, 'Camera');
    assert.equal(camera.getName(), 'Parent returns Camera');
    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);
  });
});