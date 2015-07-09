const assert = require('chai').assert;

const objectFactory = function (o, ...props) {
  return {
    create(...args) {
      const ob = Object.create(o, props.reduce((p, prop)=> {
        p[prop.name] = {value: prop()};
        return p;
      }, {}));
      if (typeof ob.init === 'function') {
        ob.init(args);
      }
      return ob;
    }
  };
};

const device = {
  init(name){
    this.name = name;
  },
  getName() {
    return this.name;
  }
};

const picture = ()=> {
  var pictures = [];
  return {
    take() {
      let pic = {id: pictures.length};
      pictures.push(pic);
      return pic;
    },
    get(){
      return pictures;
    }
  };
};

const call = ()=> {
  return {
    make (){
    }
  };
};

describe('Creating objects with non-enumerable components', ()=> {

  it('Should be able to create device', ()=> {
    let device1 = objectFactory(device).create('Cannon Camera');
    assert.equal(device1.getName(), 'Cannon Camera');
  });

  it('Should be able to take pictures', ()=> {
    let pictureTaker = picture();

    pictureTaker.take();
    pictureTaker.take();

    assert.isUndefined(pictureTaker.pictures);
    assert.equal(pictureTaker.get().length, 2);
  });

  it('Should be able to create Smartphone', ()=> {
    const smartphoneFactory = objectFactory(device, call, picture);
    let smartphone1 = smartphoneFactory.create('Nexus');
    smartphone1.picture.take();
    smartphone1.picture.take();

    assert.equal(smartphone1.getName(), 'Nexus');
    assert.isFunction(smartphone1.call.make);
    assert.isFunction(smartphone1.picture.take);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.picture.get().length, 2);

    let smartphone2 = smartphoneFactory.create('iPhone');
    smartphone2.picture.take();
    assert.equal(smartphone2.getName(), 'iPhone');
    assert.equal(smartphone2.picture.get().length, 1);
  });
});
