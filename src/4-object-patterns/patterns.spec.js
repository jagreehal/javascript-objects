const assert = require('chai').assert;

describe('Comparing object patterns', function () {

  it('A function constructor (without prototypes)', ()=> {
    function Camera(name) {
      this.name = name;
      this.random = Math.random();
      this.takePicture = ()=> {
        return this.random;
      };
    }

    let camera1 = new Camera('Canon');
    let camera2 = new Camera('Panasonic');

    assert.equal(camera1.name, 'Canon');
    assert.equal(camera2.name, 'Panasonic');

    assert.equal(camera1.takePicture(), camera1.random);
    assert.equal(camera2.takePicture(), camera2.random);

    // takePicture are copied across instances
    assert.notEqual(camera1.takePicture, camera2.takePicture);
    assert.notEqual(Object.getPrototypeOf(camera1).takePicture, camera1.takePicture);
  });

  it('A function constructor (with prototypes)', ()=> {
    function Camera(name) {
      this.name = name;
      this.random = Math.random();
    }

    Camera.prototype.takePicture = function() {
      return this.random;
    };

    let camera1 = new Camera('Canon');
    let camera2 = new Camera('Panasonic');

    assert.equal(camera1.name, 'Canon');
    assert.equal(camera2.name, 'Panasonic');

    assert.equal(camera1.takePicture(), camera1.random);
    assert.equal(camera2.takePicture(), camera2.random);

    // takePicture shared across instances
    assert.equal(camera1.takePicture, camera2.takePicture);
    assert.equal(Object.getPrototypeOf(camera1).takePicture, camera1.takePicture);
  });

  it('Object.create (no constructor have to call init)', ()=> {
    let Camera = {
      init(name){
        this.name = name;
        this.random = Math.random();
      },
      takePicture (){
        return this.random;
      }
    };

    let camera1 = Object.create(Camera);
    camera1.init('Canon');

    let camera2 = Object.create(Camera);
    camera2.init('Panasonic');

    assert.equal(camera1.name, 'Canon');
    assert.equal(camera2.name, 'Panasonic');

    assert.equal(camera1.takePicture(), camera1.random);
    assert.equal(camera2.takePicture(), camera2.random);

    // takePicture shared across instances
    assert.equal(camera1.takePicture, camera2.takePicture);
    assert.equal(Object.getPrototypeOf(camera1).takePicture, camera1.takePicture);
  });
});