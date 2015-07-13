const assert = require('chai').assert;


// See http://raganwald.com/2015/06/26/decorators-in-es7.html for a full mixin function!
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
    this.getPictures().push({});
    return this;
  },
  getPictures(){
    return this[pictures] || (this[pictures] = []);
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
    let smartphone2 = new Smartphone('iPhone');

    smartphone1.takePicture();
    smartphone1.takePicture();

    assert.equal(smartphone1.name, 'Nexus');
    assert.equal(smartphone1.getPictures().length, 2);

    assert.isFunction(smartphone1.makeCall);

    smartphone2.takePicture();
    assert.equal(smartphone2.name, 'iPhone');
    assert.equal(smartphone2.getPictures().length, 1);
  });
});
