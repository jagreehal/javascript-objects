class Foo {
  constructor(who) {
    this.me = who;
  }

  identify () {
    return `I am ${this.me}`;
  }
}

class Bar extends Foo{
  speak() {
    return `Hello, ${this.identify()}.`;
  }
}

export default Bar;