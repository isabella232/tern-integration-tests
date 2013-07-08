var Backbone = require('backbone');
exports.Person = Backbone.Model.extend({
  defaults: {
    likesIceCream: true
  }
  addFriend: function(friend) { return true; }
}, {maxNameLength: 20});
exports.Person;/*has_props:maxNameLength*/

exports.alice = new exports.Person({fullName: 'Alice'});
exports.alice;/*has_props:addFriend,fullName,url*/ // TODO(sqs): 'fullName' is failing
