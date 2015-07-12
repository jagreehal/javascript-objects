const assert = require('chai').assert;
import stampit from 'stampit';

const device = stampit().init(function () {
});

const callMaking = stampit().methods({
  makeCall (){
  }
});

const pictureTaking = stampit().init(function () {
  var pictures = [];
  this.takePicture = function () {
    let picture = {id: pictures.length};
    this.getPictures().push(picture);
    return picture;
  };
  this.getPictures = ()=> {
    return pictures;
  };
});

//const badPictureTaking = stampit().init(function () {
//  this.takePicture = function(){
//    return [];
//  };
//})();

describe('Solving the problem with StampIt', ()=> {

  it('Should be able to create Smartphone', ()=> {

    const smartphone = stampit.compose(device, callMaking, pictureTaking);

    let smartphone1 = smartphone({name: 'Nexus'});
    smartphone1.takePicture();
    smartphone1.takePicture();

    assert.equal(smartphone1.name, 'Nexus');
    assert.isFunction(smartphone1.makeCall);
    assert.isFunction(smartphone1.takePicture);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.getPictures().length, 2);

    let smartphone2 = smartphone({name: 'iPhone'});
    smartphone2.takePicture();
    assert.equal(smartphone2.name, 'iPhone');
    assert.equal(smartphone2.getPictures().length, 1);
  });
});
