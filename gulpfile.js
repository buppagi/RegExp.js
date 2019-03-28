'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const bs = require('browser-sync').create();
const del = require('del');

const DIR = {
	MIN: 'minified',
	UNCOM: 'uncompressed'
};

let errorHandler = (error) => {
	console.error(error.message);
	this.emit('end');
};

const plumberOption = {
	errorHandler: errorHandler
};


gulp.task('js', () => {
	return gulp.src(DIR.UNCOM)
		.pipe( plumber( plumberOption ) )
		.pipe( sourcemaps.init( { loadMaps: true, debug: true } ) )
		.pipe( jshint() )
		.pipe( uglify( { mangle:{ toplevel:true } } ) )
			.on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
		.pipe( rename({
			dirname: "",
			suffix: ".min"
		}) )
		.pipe( sourcemaps.write('../maps/js') )
		.pipe(gulp.dest(DIR.MIN));
});


gulp.task('clean', () => {
	return del.sync([DIR.MIN]);
});

gulp.task('default', ['clean', 'js', 'watch'], () => {
	gutil.log('Gulp is running');
});

gulp.task('watch', () => {
	let watcher = {
		js: gulp.watch(DIR.UNCOM, ['js'])
	};

	let notiify = (event) => {
		gutil.log('File', gutil.colors.yellow(event.path), 'was', util.colors.magenta(event.type));
	};

	for (let key in watcher) {
		watcher[key].on('change', notiify);
	}
});