require('babel/register');

var Benchmark = require('benchmark');
var ClassBar = require('./es2015');
var ES5Bar = require('./es5');
var ObjectBar = require('./objectcreate');

var suite = new Benchmark.Suite();
suite
  .add('Class', function () {
    var b1 = new ClassBar(Math.random());
    b1.speak();
  })
  .add('Object.create', function () {
    var b1 = Object.create(ObjectBar);
    b1.init(Math.random());
    b1.speak();
  })
  .add('ES5', function () {
    var b1 = new ES5Bar(Math.random());
    b1.speak();
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  })
  .run({'async': true});