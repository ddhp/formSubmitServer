'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    clean: {
      serve: ['public']
    },

    copy: {
      serve: {
        files: 
        [{
          expand: true,
          cwd: 'app/scripts/',
          src: '**/*.js',
          dest: 'public/scripts'
        },
        {
          expand: true,
          cwd: 'bower_components/',
          src: '**/*.js',
          dest: 'public/bower_components'
        }]
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
    'copy:serve',
    'wiredep'
  ]);
};
