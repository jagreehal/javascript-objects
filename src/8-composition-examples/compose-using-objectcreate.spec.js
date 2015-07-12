const assert = require('chai').assert;

describe('Solving the problem with compose and object.create', ()=> {

  const compose = function (o, ...props) {

    return function (args) {
      let createdObject = Object.create(o);
      props.forEach(p => p.call(createdObject));
      return Object.assign(createdObject, args);
    };
  };

  const device = {
    getName(){
      return this.name;
    }
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

  it('Should be able to create Smartphone', ()=> {

      var smartphoneFactory = compose(device, pictureTaking, callMaking);
      let smartphone1 = smartphoneFactory({name: 'Nexus'});
      let smartphone2 = smartphoneFactory({name: 'iPhone'});

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
