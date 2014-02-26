'use strict';

module.exports = function(grunt) {

  var LIVERELOAD_PORT = 35729;
  var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };
//sf app/assets/images/icons --style sass --layout packed

var globalConfig = {
  app: 'app',
  dist: 'dist',
  vendor: 'vendor',
  widgetstemp: 'app/widget-templates',
  widgetserb: 'app/views/widgets',
  widgetssass: 'app/assets/stylesheets/widgets'
};

  function getFilesJade(srcdir, destdir, wildcard, newext) {
    var path = require('path'),
        files = {};
      grunt.file.expand({cwd: srcdir}, wildcard).forEach(function(relpath) {
      var newName = path.join(relpath,destdir);
      files[path.join(destdir, relpath).split('.')[0]+'.'+ newext] = path.join(srcdir, relpath);
    });
    return files;
  };  

function getFiles(srcdir) {
  var path = require('path');
  var files = [];
  for(var i=0,il = srcdir.length;i<il;i++){
    grunt.file.expand({cwd: 'app/assets/javascripts/'+srcdir[i]}, "*.js").forEach(function(relpath) {
      files.push(srcdir[i]+relpath.split('.')[0]);
    });
  }
  return files;
};  


require('load-grunt-tasks')(grunt);
require('time-grunt')(grunt);

function log(err, stdout, stderr, cb) {
  grunt.log.write(stdout);
  cb();
};
    // Project configuration.
    grunt.initConfig({    
      configger: globalConfig,
      pkg: grunt.file.readJSON('package.json'),
      watch: {
        livereload: {
          options: {
            livereload: LIVERELOAD_PORT
          },
          files: [
      '{.tmp,<%= configger.app %>}/styles/{,*/}*.styl',
      '{.tmp,<%= configger.app %>}/views/{,*/}*.jade',
      '{.tmp,<%= configger.app %>}/javascripts/**/*.js',
      '{.tmp,<%= configger.app %>}/javascripts/**/*.htm'

      ],
      tasks: [
      'jade', 'stylus'
      ]
    },
    compiled: {
      options: {
        livereload: LIVERELOAD_PORT
      },
      files: [
      '{.tmp,<%= configger.app %>}/assets/javascripts/compiled.min.js']
    }          
  },
    open: {
      file: {
        path: 'dist/index.html'
      },
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    }, 
    connect: {
      options: {
        port: 9001,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, globalConfig.app)
            ];
          }
        }
      }
    },      
  stylus: {
    compile: {
      files: {
      '<%= configger.app %>/styles/style.css': '<%= configger.app %>/styles/style.styl', 
      }
    }
    },
    jade: {
      compile: {
        options: {
          basedir:"app/views/",
          pretty:true,
          data: {
            debug: false
          }
        },
        files: getFilesJade('app/views/', 'app/', '*.jade','html')
      }
    },  
  copy: {
    main: {
      options: {
        processContentExclude: ['application.js']
      },
      files: [
      {
        expand: true, 
        src: ['**'], 
        cwd: 'app/assets/javascripts/',
        dest: 'vendor/assets/javascripts/x'}

        ]
      }
    },
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    clean: {
      files: ['app/assets/javascripts/compiled/*.js']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['bower/requirejs/require.js', '<%= concat.dist.dest %>'],
        dest: 'app/javascripts/compiled/compiled.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'app/javascripts/compiled/compiled.min.js'
      }
    },
    githooks: {
      all: {
        options: {},
    }
  },
  requirejs: {
    compile: {
      options: {
        baseUrl: 'app/javascripts',         
        name: 'config',
        mainConfigFile: 'app/javascripts/config.js',
        include: getFiles(['component_ui/','component_data/','mixins/']),
        out: '<%= concat.dist.dest %>',
        optimize: 'none'
      }
    }
  },
  shell: {
    notify: {
      command: ['notify-send -u critical -t 1000 \'Grunt\' \'<%=voice%>\''].join(" && "),
      options: {
        stdout: true,
        gicallback: log
      }
    },
    notifyandr: {
      command: [''].join(" && "),
      options: {
        stdout: true,
        gicallback: log
      }
    },
    asscl: {
      command: ['RAILS_ENV=production rake assets:clean --trace'].join(" && "),
      options: {
        gicallback: log
      }
    },        
    asspr: {
      command: ['RAILS_ENV=production rake assets:precompile --trace'].join(" && "),
      options: {
        stdout: true,
        gicallback: log
      }

    }
  },
  preprocess : {
    options: {
      context : {
        DEBUG: true
      }
    },
    html : {
      src : '<%= configger.widgetstemp %>/_widget.html.erb',
      dest : '<%= configger.widgetserb %>/_widget-<%= preprocess.options.context.widget_name%>.html.erb'
    }
    ,
    sass : {
      src : '<%= configger.widgetstemp %>/_widget.css.sass',
      dest : '<%= configger.widgetssass %>/_widget-<%= preprocess.options.context.widget_name%>.css.sass'
    }
  }
});


    function speak(voice){
      grunt.config.set('voice', voice);
      grunt.task.run("shell:notify");
    };    
    function speakandr(voice){
      //grunt.config.set('voice', escape(voice));
      //grunt.task.run("shell:notifyandr");
    };
    var myTerminal = require("child_process").exec;
    function runShell(comm) {
      myTerminal(comm, function(error, stdout, stderr) {
          console.log(stdout);
          if (!error) {
             console.log(stderr);
          }
      });
    }
    grunt.registerTask('default', function(d){
      speak("Watch Started");
      grunt.task.run("watch");
    });
    grunt.registerTask('gitcommit', function(d){

    });      

    grunt.registerTask('clear', function(d){
      grunt.task.run('shell:asscl');
      speak("Build cleaned");
    });    
    grunt.registerTask('precompile', function(d){
      grunt.task.run('shell:asspr');
      speak("Build cleaned");
    });    

    grunt.registerTask('finishedbuild', function(d){
//      speak("Build finished");
  //    speakandr("Grunt build finished");
    });        
    grunt.registerTask('predeployfinished', function(d){
      speak("Predeploy finished");
      speakandr("Predeploy finished");
    });    

    grunt.registerTask('icons', function(d){
      speak("Icons created");
      grunt.task.run('shell:icons');
    });

    grunt.registerTask('tryshell',function(d){
      runShell(d);
      //console.log(d)
    })

    grunt.registerTask('predeploy', ['build','clear','precompile','predeployfinished']);
    grunt.registerTask('build', ['clean','requirejs', 'concat', 'uglify']);

    grunt.registerTask('widget',function(d){
      if(!d) {
        grunt.fail.fatal('All widgets should have a name, use widget:widget_name')
        return true; 
      }
      grunt.config.set('preprocess.options.context.widget_name', d );
      grunt.task.run("preprocess");
      speak("Widget:"+ d + " created");
    });


    grunt.registerTask('speak',function(d){
      if(!d) {
        grunt.fail.fatal('All widgets should have a name, use widget:widget_name')
        return true; 
      };
      speak(d);
    })

    grunt.registerTask('comp',function(type,name){
      if(!type||!name) {
        grunt.fail.fatal('Components should have a type and a name')
        return true; 
      }
      grunt.config.set('preprocess.component.options.context.type', type );
      grunt.config.set('preprocess.component.options.context.widget_name', name );
      grunt.task.run("preprocess:component")
    });


    grunt.registerTask('serve', [
      'build',      
      'stylus',      
      'jade',
      'connect:livereload',
      'open:server',
      'watch'
      ]
    );
    grunt.registerTask('prebuild', [
      'build',      
      'stylus',      
      'jade'
      ]
    );
  };
