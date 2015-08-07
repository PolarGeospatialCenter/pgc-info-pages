var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	imagemin = require('gulp-imagemin'),
	concatcss = require('gulp-concat-css'),
	uglify = require('gulp-uglify');
	rimraf = require('gulp-rimraf');

var browsersync = require('browser-sync').create();
var reload = browsersync.reload;

/** HELPER TASKS **/

// Gulp Task: browserify
// Build JavaScript using Browserify
gulp.task('browserify', function() {
	
	gulp.src('./src/js/settings.js')
		.pipe(gulp.dest('./build'))
		.pipe(reload({stream: true}));
		
	return browserify('./src/js/main.js')
		.exclude('./src/js/settings.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./build'))
		.pipe(reload({stream: true}));
});

// Gulp Task: watch
// Automatic reloading with browser-sync
gulp.task('watch', function() {
	browsersync.init({
		server:{
			baseDir: './build'
		}
	});
	
	gulp.watch('./src/js/*.js',['browserify']);
	gulp.watch('./src/php/*.php',['php']);
	gulp.watch('./src/images/*.*',['images']);
	gulp.watch('./src/css/*.css',['css']);
	gulp.watch('./src/index.html',['html']);
	gulp.watch('./src/tpl/*.html',['tpl']);
	gulp.watch('./src/**/*.html',['html']);
	
	//gulp.watch(['/src/**/*.*'],['build']);
	gulp.watch('./build/*.*').on('change',reload);
});

// Gulp Task: tpl
// Page templates
gulp.task('tpl', function() {
	return gulp.src('./src/tpl/*.html')
		.pipe(gulp.dest('./build/tpl/'))
		.pipe(reload({stream: true}));
});

// Gulp Task: html
// Optmized HTML
gulp.task('html', function() {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./build/'))
		.pipe(reload({stream: true}));
});

// Gulp Task: php
// Copy PHP
gulp.task('php', function() {
	return gulp.src('./src/php/*.php')
		.pipe(gulp.dest('./build/php/'))
		.pipe(reload({stream: true}));
});

// Gulp Task: css
// Concatenate CSS files
gulp.task('css', function() {
	return gulp.src('./src/css/**/*.css')
		.pipe(concatcss('main.css'))
		.pipe(gulp.dest('./build/'));
});

// Gulp Task: images
// Minify images and copy to build folder
gulp.task('images', function() {
	return gulp.src('./src/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/images'))
		.pipe(reload({stream: true}));
});

// Gulp Task: clean
// Clean the dist folder
gulp.task('clean', function() {
	return gulp.src(['./dist/**/*.*','./build/**/*.*'],{read: false})
		.pipe(rimraf());
});


/** RUN TASKS **/

// Gulp Task: build
// For local development
gulp.task('build', ['html','tpl','css','php','images','browserify']);

// Gulp Task: dist
// Create a production build
gulp.task('dist', ['build'], function() {
	gulp.src('./build/main.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
	
	return gulp.src(['./build/**','!./build/main.js'])
		.pipe(gulp.dest('./dist'));
});

/*
Gulp Task: default
Default gulp task (no parameters)
*/
gulp.task('default', ['build','watch']);