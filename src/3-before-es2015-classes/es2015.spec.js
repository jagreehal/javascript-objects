const assert = require('chai').assert;

describe('ES2015 classes makes inheritance easy', () => {
  class Device {
    constructor(name) {
      this.name = name || 'Unknown';
    }

    getName() {
      return this.name;
    }
  }

  it('Should be able to create Camera class', ()=> {
    // arrange
    class Camera extends Device {
    }

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);

    assert.equal(camera.getName(), 'Cannon');
    delete camera.name;
    assert.isUndefined(camera.name);

    assert.equal(camera.constructor.name, 'Camera');
  });
});
