'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      scripts: {
        files: 'app/scripts/**/*.js',
        tasks: ['jshint', 'copy:serve']
      }
    },

    jshint: {
      all: ['app/scripts/**/*.js']
    },

    clean: {
      serve: ['public']
    },

    copy: {
      serve: {
        files: 
        [{
          expand: true,
          cwd: 'app/scripts/',
          // not only .js also .html will be in directives folder
          src: '**/*',
          dest: 'public/scripts'
        },
        {
          expand: true,
          cwd: 'bower_components/',
          src: '**/*.js',
          dest: 'public/bower_components'
        },
        {
          expand: true,
          cwd: 'app/images',
          src: '**/*',
          dest: 'public/images'
        }]
      } 
    },

    sass: {
      serve: {
        files: {
          'public/styles/app.css': 'app/styles/app.scss'
        }
      }
    },

    wiredep: {
      js: {
        src: 'app/views/**/*.jade',
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
