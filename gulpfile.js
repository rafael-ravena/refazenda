/*global require*/
"use strict";

var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');

var rename = require("gulp-rename");
var hash = require('gulp-hash');
var references = require('gulp-hash-references');


/*
 * Directories here
 */
var paths = {
  public: './public/',
  sass: './src/sass/',
  css: './public/css/',
  data: './src/_data/',
  js: './public/js/',
  fonts: './public/fonts',
  images: './public/img'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
  return gulp.src('./src/*.pug')
    .pipe(data(function (file) {
      return require(paths.data + path.basename(file.path) + '.json');
    }))
    .pipe(pug())
    .on('error', function (err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(rename(function (path) {
      if(path.basename === 'index') { return }
      path.dirname = path.basename;
      path.basename = 'index';
      path.extname = '.html';
    }))
    .pipe(gulp.dest(paths.public));
});


gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest(paths.js))
});

gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest(paths.fonts))
});

gulp.task('images', function () {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest(paths.images))
    .pipe(gulp.dest('.'))
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['js', 'fonts', 'images', 'pug'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'js', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    port: 8080,
    notify: false
  });
});

/**
 * Compile .sass files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '**/*.sass')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

/**
 * Watch sass files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/fonts/*',  ['fonts']);
  gulp.watch('./src/**/*.js',  ['rebuild']);
  gulp.watch('./src/img/*',    ['rebuild']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/_data/*.json', ['rebuild']);

});

// Build task compile sass and pug.
gulp.task('build', ['sass', 'js', 'fonts', 'images', 'pug']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);