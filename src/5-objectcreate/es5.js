function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function () {
  return `I am ${this.me}`;
};

function Bar() {
  Foo.apply(this, arguments);
}

var F = function () {
};
F.prototype = Foo.prototype;
Bar.prototype = new F();

Bar.prototype.speak = function () {
  return `Hello, ${this.identify()}.`;
};

export default Bar;