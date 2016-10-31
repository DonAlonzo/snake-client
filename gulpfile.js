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

let bundle = (bundler) => {
	bundler
		.bundle()
		.pipe(source('bundled-app.js'))
		.pipe(buffer())
		.pipe(rename('game.js'))
		.pipe(gulp.dest(config.dest))
		.on('end', () => gutil.log(gutil.colors.green('==> Update!')));
}

gulp.task('default', () => {
	let bundler = browserify(config.src, {debug: true})
		.plugin(watchify) 
		.transform(babelify, {presets: ['latest']}); 

	bundle(bundler);
	bundler.on('update', () => bundle(bundler));
});
