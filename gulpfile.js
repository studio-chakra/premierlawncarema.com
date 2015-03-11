
// Include gulp
var gulp            = require('gulp');


// Include Our Plugins
var sass            = require('gulp-sass');
var compass         = require('gulp-compass');
var minifycss       = require('gulp-minify-css');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;


// Task: CSS
gulp.task('css', function() {
  return gulp.src([
        'vendor/canvas-html/style.css', 
        'vendor/canvas-html/css/dark.css',
        'vendor/canvas-html/css/font-icons.css',
        'vendor/canvas-html/css/animate.css',
        'vendor/canvas-html/css/magnific-popup.css',
        'vendor/canvas-html/css/responsive.css'
    ])
    .pipe(concat('core.css'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}));
});



// Task: Bootstrap
gulp.task('bootstrap', function () {
    return gulp.src('scss/bootstrap.scss')
        .pipe(sass())
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});


// Task: Sass
gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe(sass({includePaths: ['scss']}))
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

gulp.task('compass', function () {
    return gulp.src('scss/app.scss')
        .pipe(compass({
          config_file: './config.rb',
          css: './css',
          sass: './scss',
          image: './images'
        }))
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});


// Task: Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src([
//         'bower_components/jquery/dist/jquery.js',
//         'vendor/jQueryMosaic/js/mosaic.1.0.1.js',
//         'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
//         'bower_components/magnific-popup/dist/jquery.magnific-popup.js'
//         ])
//         .pipe(concat('vendor.js'))
//         .pipe(gulp.dest('js'))
//         .pipe(rename('vendor.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('js'));
// });


// Task: Copy FontAwesome fonts
gulp.task('copyfonts', function() {
   gulp.src('bower_components/fontawesome/fonts/**/*.{ttf,woff,eot,svg,woff2,otf}')
   .pipe(gulp.dest('fonts'))
   gulp.src('vendor/canvas-html/css/fonts/**/*.{ttf,woff,eot,svg,woff2,otf}')
   .pipe(gulp.dest('css/fonts'));
});


// Task: Copy JS from CORE
gulp.task('copy', function() {
    return gulp.src([
        'vendor/canvas-html/js/jquery.js',
        'vendor/canvas-html/js/plugins.js',
        'vendor/canvas-html/js/functions.js'
    ])
    .pipe(gulp.dest('js'))
});


// Task: Browser Sync
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "premierlawncarema.dev",
        files: "css/**"
        // reloadDelay: 5000
    });
});


// Task: Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// WATCH
gulp.task('default', ['css', 'bootstrap', 'compass', 'browser-sync', 'copy', 'copyfonts'], function () {
    gulp.watch("scss/**/*.scss", ['compass']);
    gulp.watch("*.html").on("change", browserSync.reload);
});