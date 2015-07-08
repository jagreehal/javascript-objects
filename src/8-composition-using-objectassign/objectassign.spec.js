const assert = require('chai').assert;


const device = {
  getName() {
    return this.name;
  }
};

const filmLoading = {
  loadFilm (){
  }
};

const pictureTaking = ()=> {
  var pictures = [];
  return {
    takePicture() {
      let picture = {id: pictures.length};
      pictures.push(picture);
      return picture;
    },
    getPictures(){
      return pictures;
    }
  };
};

const callMaking = {
  makeCall (){
  }
};

describe('Solving the problem with Object.assign', ()=> {

  it('Should be able to create device', ()=> {
    let device1 = Object.assign(Object.create(device), {name: 'Cannon Camera'});

    assert.equal(device1.getName(), 'Cannon Camera');
  });

  it('Should be able to create device using factory', ()=> {

    const deviceFactory = {
      create(data){
        return Object.assign(Object.create(device), data);
      }
    };

    let device1 = deviceFactory.create({name: 'Cannon Camera'});
    assert.equal(device1.getName(), 'Cannon Camera');
  });

  it('Should be able to take pictures', ()=> {
    let pictureTaker = pictureTaking();

    pictureTaker.takePicture();
    pictureTaker.takePicture();

    assert.isUndefined(pictureTaker.pictures);
    assert.equal(pictureTaker.getPictures().length, 2);
  });

  it('Should be able to take load film pictures', ()=> {
    let camera1 = Object.assign(Object.create(device), filmLoading, pictureTaking(), {name: 'Cannon'});

    assert.equal(camera1.getName(), 'Cannon');
    assert.isFunction(camera1.loadFilm);
    assert.isFunction(camera1.takePicture);
    assert.isNotFunction(camera1.makeCall);
  });

  it('Should be able make a call', ()=> {
    let phone1 = Object.assign(Object.create(device), callMaking, {name: 'BT-100'});

    assert.equal(phone1.getName(), 'BT-100');
    assert.isFunction(phone1.makeCall);
  });

  it('Should be able to create Smartphone', ()=> {

    const smartphoneFactory = {
      create(data){
        return Object.assign(Object.create(device), callMaking, pictureTaking(), data);
      }
    };

    let smartphone1 = smartphoneFactory.create({name: 'Nexus'});
    smartphone1.takePicture();
    smartphone1.takePicture();

    assert.equal(smartphone1.getName(), 'Nexus');
    assert.isFunction(smartphone1.makeCall);
    assert.isFunction(smartphone1.takePicture);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.getPictures().length, 2);

    let smartphone2 = smartphoneFactory.create({name: 'iPhone'});
    smartphone2.takePicture();
    assert.equal(smartphone2.getName(), 'iPhone');
    assert.equal(smartphone2.getPictures().length, 1);
  });

});
