const assert = require('chai').assert;

describe('ES2015 classes makes inheritance easy', () => {
  class Device {
    constructor(name = 'Unknown') {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }

  class Camera extends Device {
  }

  it('Should be able to create Camera class', ()=> {
    let camera = new Camera('Cannon');

    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);

    assert.equal(camera.getName(), 'Cannon');
    delete camera.name;
    assert.isUndefined(camera.name);

    assert.equal(Object.getPrototypeOf(camera).getName, camera.getName);
    assert.equal(camera.constructor.name, 'Camera');
  });
});
