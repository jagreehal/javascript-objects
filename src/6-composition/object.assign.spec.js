const assert = require('chai').assert;

const Device = {};

const pictureTaking = {
  takePicture: ()=> {
  }
};


describe('Composition using object assign', ()=> {
  it('Can extend objects', ()=> {

    var camera = Object.assign(Device, pictureTaking, {name: 'Canon'});
    assert.equal(camera.name, 'Canon');
    assert.isFunction(camera.takePicture);
  });
});