const assert = require('chai').assert;

describe('Composition using constructors', function () {

  function Device(name = 'unknown') {
    this.name = name;
  }

  function Camera() {
    this.takePicture = ()=> {
    };
  }

  function CameraDevice(...args) {
    Device.apply(this, args);
    Camera.apply(this);
  }

  it('Can compose', ()=> {
    let cameraDevice = new CameraDevice('Canon');

    assert.equal(cameraDevice.name, 'Canon');
    assert.isFunction(cameraDevice.takePicture);
    assert.notOk(CameraDevice.prototype.takePicture);
  });
});