"use strict"

const gulp = require('gulp'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      watchify = require('watchify'),
      rename = require('gulp-rename'),
      gutil = require('gulp-util');


const config = {
	src: './src/main.js',
	dest: '.'
};

gulp.task('build', () => {
	return browserify(config.src, {debug:true})
		.transform(babelify, {presets: ['latest']})
		.bundle()
		.on('error', (e) => gutil.log(gutil.colors.red(e.message)))
		.pipe(source('bundled-app.js'))
		.pipe(buffer())
		.pipe(rename('game.js'))
		.pipe(gulp.dest(config.dest))
		.on('end', () => gutil.log(gutil.colors.green('==> Update!')));
});

gulp.task('watch', ['build'], () => {
	gulp.watch('.src/*.js', ['build']);
});

gulp.task('default', ['watch']);
