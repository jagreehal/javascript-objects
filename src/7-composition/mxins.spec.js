const assert = require('chai').assert;

function extend(destination, source) {
  for (var k in source) {
    destination[k] = source[k];
  }
  return destination;
}

class Device {
  constructor(name = 'Unknown') {
    this.name = name;
  }
}

const pictureTaking = {
  takePicture: ()=> {
  }
};


describe('Composition using extend', ()=> {
  it('Can extend objects', ()=> {

    extend(Device.prototype, pictureTaking);

    let camera = new Device('Cannon');
    assert.equal(camera.name, 'Cannon');
    assert.isFunction(camera.takePicture);
  });
});