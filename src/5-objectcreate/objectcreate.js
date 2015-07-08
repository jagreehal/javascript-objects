const Foo = {
  init: function (who) {
    this.me = who;
  },
  identify: function () {
    return `I am ${this.me}`;
  }
};

const Bar = Object.create(Foo);

Bar.speak = function () {
  return `Hello, ${this.identify()}.`;
};

export default Bar;