const assert = require('chai').assert;


// See http://raganwald.com/2015/06/26/decorators-in-es7.html
function mixin(behaviour) {
  return (clazz)=> {
    for (let property of Reflect.ownKeys(behaviour)) {
      Object.defineProperty(clazz.prototype, property, {value: behaviour[property]});
    }
    return clazz;
  };
}

class Device {
  constructor(name) {
    this.name = name;
  }
}

const pictures = Symbol('pictures');
const pictureTaking = mixin({

  takePicture() {
    if (!this[pictures]) {
      this[pictures] = [];
    }
    let picture = {id: this[pictures].length};
    this[pictures].push(picture);
    return this;
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
  it('Should be able to create Smartphone', ()=> {
    @callMaking
    @pictureTaking
    class Smartphone extends Device {
    }

    let smartphone1 = new Smartphone('Nexus');
    smartphone1.takePicture();
    smartphone1.takePicture();

    assert.equal(smartphone1.name, 'Nexus');
    assert.isFunction(smartphone1.makeCall);

    assert.equal(smartphone1.getPictures().length, 2);

    assert.include(Object.keys(smartphone1), 'name');
    assert.notInclude(Object.keys(smartphone1), 'pictures');


    let smartphone2 = new Smartphone('iPhone');
    assert.equal(smartphone2.name, 'iPhone');

    assert.isFunction(smartphone2.makeCall);

    smartphone2.takePicture();
    assert.equal(smartphone2.getPictures().length, 1);
  });
});
