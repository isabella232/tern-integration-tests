var Backbone = require('backbone');

Backbone;/*type:{$: fn(selector: string, context: Element) -> jQuery.fn, Events: Backbone.Events, VERSION: string, emulateHTTP: bool, emulateJSON: bool, noConflict: fn(), ...}*/

exports.Person = Backbone.Model.extend({
  defaults: {
    likesIceCream: true
  }
  addFriend: function(friend) { return true; }
}, {maxNameLength: 20});
exports.Person;/*has_props:maxNameLength*/

exports.alice = new exports.Person({fullName: 'Alice'});
exports.alice;/*has_props:addFriend,fullName,url*/ // TODO(sqs): 'fullName' is failing
