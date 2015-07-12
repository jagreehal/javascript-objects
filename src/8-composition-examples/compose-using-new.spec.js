const assert = require('chai').assert;

describe('Solving the problem with compose and new', ()=> {
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

  const badPictureTaking = (function () {
    return function () {
      this.takePicture = ()=> {
        return [];
      };
    };
  })();

  it('Should be able to create Smartphone', ()=> {
      var smartphoneFactory = compose(Device, pictureTaking, callMaking);

      let smartphone1 = smartphoneFactory('Nexus');
      let smartphone2 = smartphoneFactory('iPhone');


      assert.isFunction(smartphone1.takePicture);
      smartphone1.takePicture();
      smartphone1.takePicture();

      assert.equal(2, smartphone1.getPictures().length);

      assert.include(Object.keys(smartphone1), 'pictures');

      assert.equal(smartphone1.name, 'Nexus');

      assert.equal(smartphone2.name, 'iPhone');
      assert.equal(0, smartphone2.getPictures().length);
    }
  );
});
