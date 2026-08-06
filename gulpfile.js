const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const imagemin = require('gulp-imagemin');
const concatcss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const { deleteAsync } = require('del');

const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

/** HELPER TASKS **/

// JavaScript bundling
function browserifyTask() {
    gulp.src('./src/js/settings.js')
        .pipe(gulp.dest('./build'))
        .pipe(reload({ stream: true }));

    return browserify('./src/js/main.js')
        .exclude('./src/js/settings.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build'))
        .pipe(reload({ stream: true }));
}

// Page templates
function tpl() {
    return gulp.src('./src/tpl/*.html')
        .pipe(gulp.dest('./build/tpl/'))
        .pipe(reload({ stream: true }));
}

// HTML compilation
function html() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build/'))
        .pipe(reload({ stream: true }));
}

// Copy PHP
function php() {
    return gulp.src('./src/php/*.php')
        .pipe(gulp.dest('./build/php/'))
        .pipe(reload({ stream: true }));
}

// Concatenate CSS
function css() {
    return gulp.src('./src/css/**/*.css')
        .pipe(concatcss('main.css'))
        .pipe(gulp.dest('./build/'));
}

// Minify images
function images() {
    return gulp.src('./src/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .pipe(reload({ stream: true }));
}

// Clean output directories
function clean() {
    return deleteAsync(['./dist', './build']);
}

// Watch task
function watch() {
    browsersync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch('./src/js/*.js', browserifyTask);
    gulp.watch('./src/php/*.php', php);
    gulp.watch('./src/images/*.*', images);
    gulp.watch('./src/css/*.css', css);
    gulp.watch('./src/index.html', html);
    gulp.watch('./src/tpl/*.html', tpl);
    gulp.watch('./src/**/*.html', html);

    gulp.watch('./build/*.*').on('change', reload);
}

// Dist task logic
function distFiles() {
    gulp.src('./build/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

    return gulp.src(['./build/**', '!./build/main.js'])
        .pipe(gulp.dest('./dist'));
}

/** COMPOSITE TASKS **/

const build = gulp.parallel(html, tpl, css, php, images, browserifyTask);
const dist = gulp.series(build, distFiles);
const defaultTask = gulp.series(build, watch);

/** TASK EXPORTS **/

exports.browserify = browserifyTask;
exports.tpl = tpl;
exports.html = html;
exports.php = php;
exports.css = css;
exports.images = images;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.dist = dist;
exports.default = defaultTask;