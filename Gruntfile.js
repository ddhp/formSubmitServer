'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var config = {
    path: 'app/client'
  };

  grunt.initConfig({
    config: config,

    watch: {
      scripts: {
        files: '<%= config.path %>/scripts/**/*.js',
        tasks: ['jshint', 'copy:serve']
      }
    },

    jshint: {
      all: ['<%= config.path %>/scripts/**/*.js']
    },

    clean: {
      serve: ['public/*', '!public/bower_components/**']
    },

    copy: {
      serve: {
        files: 
        [{
          expand: true,
          cwd: '<%= config.path %>/scripts/',
          // not only .js also .html will be in directives folder
          src: '**/*',
          dest: 'public/scripts'
        },
        {
          expand: true,
          cwd: '<%= config.path %>/images',
          src: '**/*',
          dest: 'public/images'
        }]
      } 
    },

    sass: {
      serve: {
        files: {
          'public/styles/app.css': '<%= config.path %>/styles/app.scss'
        }
      }
    },

    wiredep: {
      js: {
        src: 'app/server/views/**/*.jade',
        ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/,
        devDependencies: true
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:serve',
    'jshint',
    'copy:serve',
    'sass:serve',
    'wiredep',
    'watch'
  ]);
};
