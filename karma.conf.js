// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

module.exports = function (config) {
  'use strict';

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // loaded without require
      'vendor/assets/javascripts/b/es5-shim/es5-shim.js',
      'vendor/assets/javascripts/b/es5-shim/es5-sham.js',
      'vendor/assets/javascripts/b/jquery/jquery.js',
      'vendor/assets/javascripts/b/jasmine-jquery/lib/jasmine-jquery.js',
      'vendor/assets/javascripts/b/jasmine-flight/lib/jasmine-flight.js',

      // hack to load RequireJS after the shim libs
      'node_modules/karma-requirejs/lib/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      // loaded with require
      {pattern: 'vendor/assets/javascripts/b/flight/**/*.js', included: false},
      {pattern: 'app/assets/javascripts/component_ui/**/*.js', included: false},
      {pattern: 'testjs/spec/**/*.spec.js', included: false},

      'testjs/test-main.js'
    ],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'growler'],

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome, Firefox, Safari
    browsers: [
      'PhantomJS'
    ],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-phantomjs-launcher',
      'karma-safari-launcher'
    ]
  });
};
