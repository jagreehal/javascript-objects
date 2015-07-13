const assert = require('chai').assert;

const objectFactory = function (o, ...props) {
  return {
    create(...args) {
      const composedObject = Object.create(o, props.reduce((p, prop)=> {
        p[prop.name] = {value: prop()};
        return p;
      }, {}));
      if (typeof composedObject.init === 'function') {
        composedObject.init(args);
      }
      return composedObject;
    }
  };
};

const device = {
  init(name){
    this.name = name;
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

describe('Composing with named components', ()=> {

  it('Should be able to create Smartphone', ()=> {

    const smartphoneFactory = objectFactory(device, call, picture);

    let smartphone1 = smartphoneFactory.create('Nexus');
    let smartphone2 = smartphoneFactory.create('iPhone');

    smartphone1.picture.take();
    smartphone1.picture.take();

    assert.equal(smartphone1.name, 'Nexus');
    assert.equal(smartphone1.picture.get().length, 2);

    assert.isFunction(smartphone1.call.make);

    smartphone2.picture.take();

    assert.equal(smartphone2.name, 'iPhone');
    assert.equal(smartphone2.picture.get().length, 1);
  });
});
