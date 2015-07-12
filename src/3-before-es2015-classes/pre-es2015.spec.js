const assert = require('chai').assert;

describe('Getting to the ES5 holy grail', () => {
  // here we have a function we want to inherit from
  function Device(name = 'Unknown') {
    this.name = name;
  }

  Device.prototype.getName = function () {
    return this.name;
  };

  it('Does not call the Device constructor', ()=> {
    // arrange
    function Camera() {
    }

    Camera.prototype = new Device();

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);
    assert.equal(camera.getName(), 'Unknown');
  });

  it('Rent-a-Constructor (breaks the prototype)', ()=> {
    // arrange
    function Camera() {
      Device.apply(this, arguments);
    }

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.notInstanceOf(camera, Device);
    assert.instanceOf(camera, Camera);

    assert.equal(camera.name, 'Cannon');

    assert.isUndefined(camera.getName);
  });

  it('Rent and Set Prototype (makes copies of the properties)', ()=> {
    // arrange
    function Camera() {
      Device.apply(this, arguments);
    }

    Camera.prototype = new Device();

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);

    assert.equal(camera.getName(), 'Cannon');
    delete camera.name;
    assert.equal(camera.name, 'Unknown');
  });

  it('Share the Prototype (but constructor points to the wrong object)', ()=> {
    // arrange
    function Camera() {
      Device.apply(this, arguments);
    }

    var F = function () {
    };
    F.prototype = Device.prototype;
    Camera.prototype = new F();

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.instanceOf(camera, Device);
    assert.instanceOf(camera, Camera);

    assert.equal(camera.getName(), 'Cannon');
    delete camera.name;
    assert.isUndefined(camera.name);

    assert.equal(camera.constructor.name, 'Device');
  });

  it('A Temporary Constructor (finally works!)', ()=> {
    // arrange
    function Camera() {
      Device.apply(this, arguments);
    }

    var F = function () {
    };
    F.prototype = Device.prototype;
    Camera.prototype = new F();
    Camera.prototype.constructor = Camera;

    // act
    let camera = new Camera('Cannon');

    // assert
    assert.equal(camera.getName(), 'Cannon');
    delete camera.name;
    assert.isUndefined(camera.name);

    assert.equal(camera.constructor, Camera);
  });
});
