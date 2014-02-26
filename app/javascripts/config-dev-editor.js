requirejs.config({
  baseUrl: 'javascripts',
  paths: {
    'bower':'lib/bower',
    'jquery': 'lib/bower/jquery/dist/jquery.min',
    "underscore":"lib/bower/lodash/dist/lodash",
    'flight': 'lib/bower/flight',
    "mixins": "mixins",
    "lib": "lib",
    "temp":"templates",
    "text":"lib/text"
  }
  
});


require(['map-editor']);