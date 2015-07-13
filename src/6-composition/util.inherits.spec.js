const assert = require('chai').assert;
const inherits = require('util').inherits;

function Device(name) {
  this.name = name;
}

Device.prototype.identify = ()=> {
  return 'Device';
};

function Camera(name) {
  this.pictures = [];
  Device.call(this, name);
}

inherits(Camera, Device);

Camera.prototype.takePicture = ()=> {
};

describe('Composition using util.inherits', ()=> {
  it('Can extend objects', ()=> {
    let camera = new Camera('Cannon');
    assert.equal('Cannon', camera.name);
    assert.isFunction(camera.takePicture);
  });
});

