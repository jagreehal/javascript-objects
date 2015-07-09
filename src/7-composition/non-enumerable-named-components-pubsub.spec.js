const assert = require('chai').assert;

function createStore(q) {
  let topics = {}, subUid = -1;
  q.subscribe = (topic, func)=> {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    let token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  q.publish = (topic, args)=> {
    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return true;
  };

  q.unsubscribe = (token)=> {
    for (let m in topics) {
      if (topics[m]) {
        for (let i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  };
}

const objectFactory = function (o, ...props) {
  return {
    create(args) {
      let store = {};
      createStore(store);
      return Object.freeze(Object.assign(Object.create(o, props.reduce((p, prop)=> {
        p[prop.name] = {value: prop(store)};
        return p;
      }, {})), args));
    }
  };
};

const device = {
  getName() {
    return this.name;
  }
};

const picture = (store)=> {
  let pictures = [];

  return {
    take() {
      let pic = {id: pictures.length};
      pictures.push({});
      store.publish('picture:taken', picture);
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

const messenger = (store)=> {
  let messages = [];

  function send(message) {
    messages.push(message);
  }

  store.subscribe('picture:taken', send);

  return {
    send,
    get(){
      return messages;
    }
  };
};

describe('Creating objects with non-enumerable components with pubsub', ()=> {

  it('Should be able to create Smartphone', ()=> {
    const smartphoneFactory = objectFactory(device, call, picture, messenger);
    let smartphone1 = smartphoneFactory.create({name: 'Nexus'});
    smartphone1.picture.take();
    smartphone1.picture.take();

    assert.equal(smartphone1.getName(), 'Nexus');
    assert.isFunction(smartphone1.call.make);
    assert.isFunction(smartphone1.picture.take);
    assert.isNotFunction(smartphone1.filmLoading);

    assert.equal(smartphone1.picture.get().length, 2);
    assert.equal(2, smartphone1.messenger.get().length);

    let smartphone2 = smartphoneFactory.create({name: 'iPhone'});
    assert.equal(0, smartphone2.messenger.get().length);

    smartphone2.picture.take();

    assert.equal(1, smartphone2.messenger.get().length);
  });
});
