'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfig = require('./package').jshintConfig;
var jscs = require('gulp-jscs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');

// Prevent looking up default files
jshintConfig.lookup = false;

// Default
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'html');
});

// Linter
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

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
    'public/app/app.module.js',
    'public/app/**/*module.js',
    'public/app/**/*.js'
    ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/src'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src([
    'pubic/app/assets/css/index.css',
    'public/app/assets/**/*.css'
    ])
  .pipe(prefix('last 2 versions'))
  .pipe(concat('app.min.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('public/src'));
});

// HTML
gulp.task('html', function() {
  return gulp.src('public/app/views/**/*.html')
  .pipe(htmlMin({collapseWhitespace: true}))
  .pipe(gulp.dest('public/src'));
});

// Index
gulp.task('index', function() {
  return gulp.src('public/app/index.html')
  .pipe(htmlreplace({
    'js': 'app.min.js',
    'css': 'app.min.css'
  }))
  .pipe(gulp.dest('public/src'));
});