'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfig = require('./package').jshintConfig;
var jscs = require('gulp-jscs');

// Prevent looking up default files
jshintConfig.lookup = false;

gulp.task('default', function() {

});

gulp.task('lint', function() {
  return gulp.src([
    'public/**/*.js',
    'server/**/*.js',
    'test/**/*.js',
    '*.js'
  ])
  .pipe(jshint(jshintConfig))
  .pipe(jscs())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs.reporter());
});