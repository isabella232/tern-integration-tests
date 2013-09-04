/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models',
], function ($, _, Backbone, models) {
  var p = new models.Person();
  var AppView = Backbone.View.extend({
    el: '#app',
    events: {
      'keyup #name': 'updatePreview',
      'click #update-name': 'updateName'
    },
    initialize: function () {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$hello = this.$('#hello');
      this.$nameInput = this.$('input#name');
      this.$updateBtn = this.$('button#update-name');
      this.$preview = this.$('#preview');
    },
    render: function () {
      this.$hello.html(this.helloLabel());
      this.$preview.html('');
    },
    updatePreview: function() {
      if (this.$nameInput.val()) {
        this.$preview.html('Preview: ' + this.helloLabel());
      }
    },
    updateName: function(event) {
      event.preventDefault();
      this.render();
      this.$nameInput.val('');
    },
    helloLabel: function() {
      return 'Hello, ' + this.$nameInput.val() + '!';
    }
  });

  var av = new AppView();
  av;/*has_props:el,events,initialize,render,updatePreview,updateName,helloLabel*/
  av.helloLabel;/*type:fn() -> string*/
  av.events;/*type:{click #update-name: string, keyup #name: string}*/

  return {AppView: AppView};
});
