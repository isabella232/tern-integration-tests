/*global define*/
define([
  'underscore',
  'backbone',
], function (_, Backbone) {
  Backbone.Model;/*has_props:extend*/

  var Person = Backbone.Model.extend({
    defaults: {
      fullName: 'Alice Smith'
    }
  }, {maxNameLength: 25});

  Person;/*has_props:maxNameLength*/

  return {
    Person: Person
  };
});
