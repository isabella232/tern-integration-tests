/*global require*/
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
	'underscore',
	'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: 'bower_components/jquery/jquery',
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone'
  }
});

require([
  'underscore',
  'backbone',
  'views',
], function (_, Backbone, views) {
  Backbone.Model;/*has_props:extend*/

  Backbone;/*has_props:history,Events*/

  var appView = new views.AppView();
  appView;/*has_props:render,helloLabel*/
});
