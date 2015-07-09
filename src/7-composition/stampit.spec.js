const assert = require('chai').assert;
import stampit from 'stampit';



  var device = stampit().init(function () {
    this.getName = function () {
      return this.name;
    };
  });

  var filmLoading = stampit().methods({
    loadFilm () {
    }
  });

  var callMaking = stampit().methods({
    makeCall (){
    }
  });

  var pictureTaking = stampit().init(function () {
    var pictures = [];
    this.take = function () {
      let picture = {id: pictures.length};
      pictures.push(picture);
      return picture;
    };
    this.get = ()=> {
      return pictures;
    };
  });

describe('Solving the problem with StampIt', ()=> {

  it('Should be able to create device', ()=> {
    let device1 = device({name: 'Cannon Camera'});
    assert.equal(device1.getName(), 'Cannon Camera');
  });

  it('Should be able to take pictures', ()=> {
    var pictureTaker = pictureTaking();

    pictureTaker.take();
    pictureTaker.take();

    assert.isUndefined(pictureTaker.pictures);
    assert.equal(pictureTaker.get().length, 2);
  });

  it('Should be able to take load film pictures', ()=> {
    const camera = stampit.compose(device, filmLoading, pictureTaking);

    let camera1 = camera({name: 'Cannon'});

    assert.equal(camera1.getName(), 'Cannon');
    assert.isFunction(camera1.loadFilm);
    assert.isFunction(camera1.take);
    assert.isNotFunction(camera1.makeCall);
  });

  it('Should be able make a call', ()=> {
    const phone = stampit.compose(device, callMaking);

    let phone1 = phone({name: 'BT-100'});

    assert.equal(phone1.getName(), 'BT-100');
    assert.isFunction(phone1.makeCall);
  });

  it('Should be able to create Smartphone', ()=> {
    const smartphone = stampit.compose(device, callMaking, pictureTaking);

    let smartphone1 = smartphone({name: 'Nexus'});
    smartphone1.take();
    smartphone1.take();

    assert.equal(smartphone1.getName(), 'Nexus');
    assert.isFunction(smartphone1.makeCall);
    assert.isFunction(smartphone1.take);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.get().length, 2);

    let smartphone2 = smartphone({name: 'iPhone'});
    smartphone2.take();
    assert.equal(smartphone2.getName(), 'iPhone');
    assert.equal(smartphone2.get().length, 1);
  });
});
