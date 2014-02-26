requirejs.config({
  baseUrl: 'javascripts',
  paths: {
    'bower':'lib/bower',
    'jquery': 'lib/bower/jquery/dist/jquery.min',
    'flight': 'lib/bower/flight',
    "underscore":"lib/bower/lodash/dist/lodash",
    "mixins": "mixins",
    "lib": "lib",
    "text":"lib/text",
    "temp":"templates",
    "application":"application"
  }
  
});

require(["text"]);
require(["jquery"]);
require(["application"]);