const assert = require('chai').assert;

function mixin(behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol('isa');

  function _mixin(clazz) {
    for (let property of instanceKeys)
      Object.defineProperty(clazz.prototype, property, {value: behaviour[property]});
    Object.defineProperty(clazz.prototype, typeTag, {value: true});
    return clazz;
  }

  for (let property of sharedKeys)
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property)
    });
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag]
  });
  return _mixin;
}

class Device {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
const filmLoading = mixin({
  loadFilm (){
  }
});

const pictures = Symbol('pictures');
const pictureTaking = mixin({

  takePicture() {
    if (!this[pictures]) {
      this[pictures] = [];
    }
    let picture = {id: this[pictures].length};
    this[pictures].push(picture);
    return picture;
  },
  getPictures(){
    return this[pictures];
  }
});

const callMaking = mixin({
  makeCall (){
  }
});

describe('Solving the problem with decorators', ()=> {
  it('Should be able to create device', ()=> {
    let device = new Device('anything');
    assert.instanceOf(device, Device);
    assert.equal(device.getName(), 'anything');
  });

  it('Should be able to take pictures', ()=> {
    @pictureTaking
    class PictureTaker {
    }

    let pictureTaker = new PictureTaker();

    pictureTaker.takePicture();
    pictureTaker.takePicture();

    assert.isUndefined(pictureTaker.pictures);
    assert.equal(pictureTaker.getPictures().length, 2);
  });

  it('Should be able to take load film pictures', ()=> {
    @filmLoading @pictureTaking
    class Camera extends Device {
    }

    let camera1 = new Camera('Cannon');

    assert.equal(camera1.getName(), 'Cannon');
    assert.isFunction(camera1.loadFilm);
    assert.isFunction(camera1.takePicture);
    assert.isNotFunction(camera1.makeCall);
  });

  it('Should be able to phone', ()=> {
    @callMaking class Phone extends Device {
    }

    let phone = new Phone('BT-100');

    assert.equal(phone.getName(), 'BT-100');
    assert.isFunction(phone.makeCall);
  });

  it('Should be able to create Smartphone', ()=> {
    @callMaking @pictureTaking
    class Smartphone extends Device {
    }

    let smartphone1 = new Smartphone('Nexus');
    smartphone1.takePicture();
    smartphone1.takePicture();

    assert.equal(smartphone1.getName(), 'Nexus');
    assert.isFunction(smartphone1.makeCall);
    assert.isFunction(smartphone1.takePicture);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.getPictures().length, 2);

    let smartphone2 = new Smartphone('Nexus 1');
    assert.equal(smartphone2.getName(), 'Nexus 1');
    assert.isFunction(smartphone2.makeCall);
    assert.isFunction(smartphone2.takePicture);
    smartphone2.takePicture();
    assert.equal(smartphone2.getPictures().length, 1)
  });
});
