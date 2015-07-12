const assert = require('chai').assert;

class Device {
  constructor(name = 'Unknown') {
    this.name = name;
  }
}

Object.defineProperty(Device.prototype, 'takePicture', {
  value: ()=> {
  }
});

describe('Composition using extend', ()=> {
  it('Can extend objects', ()=> {

    let camera = new Device('Cannon');
    assert.equal(camera.name, 'Cannon');
    assert.isFunction(camera.takePicture);
  });

  it('Cannot add duplicate', ()=> {

    //Object.defineProperty(Device.prototype, 'takePicture', {value: 1});
    let camera = new Device('Cannon');
    assert.equal(camera.name, 'Cannon');
    assert.isFunction(camera.takePicture);
  });
});