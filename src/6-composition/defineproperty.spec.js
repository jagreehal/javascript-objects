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

describe('Composition using Object.defineProperty', ()=> {
  it('Can extend objects', ()=> {

    let camera = new Device('Cannon');
    assert.equal(camera.name, 'Cannon');
    assert.isFunction(camera.takePicture);
    assert.ok(Device.prototype.takePicture);
  });

  it('Cannot add duplicate peroperty', ()=> {
    //Object.defineProperty(Device.prototype, 'takePicture', {value: 1});
  });
});