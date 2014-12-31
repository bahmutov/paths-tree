/*global module:false*/
module.exports = function(grunt) {
  var sourceFiles = ['index.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: sourceFiles,
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-summary')
      }
    },

    gt: {
      tests: {
        src: ['test/index.js']
      }
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['nice-package', 'jshint', 'gt']);
};
