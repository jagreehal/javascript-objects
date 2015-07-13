const assert = require('chai').assert;


const compose = function (O, ...props) {
  props.forEach(p => p.call(O.prototype));

  return function (...args) {
    return new O(args);
  };
};

const pictureTaking = (function () {
  function takePicture() {
    this.getPictures().push({});
  }

  function getPictures() {
    return this.pictures || (this.pictures = []);
  }

  return function () {
    this.takePicture = takePicture;
    this.getPictures = getPictures;
    return this;
  };
})();

const callMaking = (function () {
  function makeCall() {
  }

  return function () {
    this.makeCall = makeCall;
    return this;
  };
})();

const Device = function (name) {
  this.name = name;
};

describe('Composing with functional mixins', ()=> {
  it('Should be able to create Smartphone', ()=> {

      const smartphoneFactory = compose(Device, pictureTaking, callMaking);

      let smartphone1 = smartphoneFactory('Nexus');
      let smartphone2 = smartphoneFactory('iPhone');

      smartphone1.takePicture();
      smartphone1.takePicture();

      assert.equal(smartphone1.name, 'Nexus');
      assert.equal(smartphone1.getPictures().length, 2);

      assert.isFunction(smartphone1.makeCall);

      smartphone2.takePicture();
      assert.equal(smartphone2.name, 'iPhone');
      assert.equal(smartphone2.getPictures().length, 1);
    }
  );
});
