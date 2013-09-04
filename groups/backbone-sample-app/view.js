var Backbone = require('backbone');
var Test = Backbone.View.extend({
  foo:/*def:exports.t.foo*/ function () {
    this.something = 42;
  },
  bar:/*def:exports.t.bar*/ function () {
    this;/*has_props:foo,bar,something,qux*/
  }
});

exports.t = new Test();
exports.t;/*has_props:foo,bar,something,qux*/
exports.t.qux = 1;
