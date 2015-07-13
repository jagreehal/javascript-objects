const assert = require('chai').assert;

const Device = {};

const pictureTaking = {
  takePicture: ()=> {
  }
};


describe('Composition using object assign', ()=> {
  it('Can extend objects', ()=> {

    var camera = Object.assign(Device, pictureTaking, {name: 'Cannon'});
    assert.equal(camera.name, 'Cannon');
    assert.isFunction(camera.takePicture);
  });
});