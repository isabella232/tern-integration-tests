/*global require*/
'use strict';

require.config({
  paths: {
    underscore: 'bower_components/underscore/underscore',
  }
});

require([
  'underscore',
], function (_) {
  _;/*has_props:isFunction*/
  _.isFunction;/*type:fn(obj: ?) -> bool*/
});
