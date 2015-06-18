/**
 * Created by kchunter on 2/11/2015.
 */
var gulp            = require('gulp');
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var ngdocs          = require('gulp-ngdocs');
var sass            = require('gulp-sass');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var replace         = require('gulp-replace');
var runSequence     = require('run-sequence');
var del             = require('del');
var browserSync     = require('browser-sync');

var buildDir        = 'bin/';
var appJavaScript   = ['src/js/general/app.js', 'src/js/general/module.js', 'src/js/general/configs.js',
        'src/js/general/general.controller.js', 'src/js/general/general.directive.js', 'src/js/general/grid.controller.js', 'src/js/general/chart.controller.js',
        'src/js/general/grid.directive.js', 'src/js/general/heightSource.directive.js',
        'src/js/angles/*.js', 'src/js/charts/*.js', 'src/js/checkbox/*.js', 'src/js/coordinate/*.js',  'src/js/geometry/*.js',
        'src/js/numberline/*.js', 'src/js/time/*.js', 'src/js/temperature/*.js', 'src/js/fractions/*.js'];


/* javscript tasks */
gulp.task('scripts', function ()
{
    var js = gulp.src('src/js/*.js');

    return js
        .pipe(concat('image_and_mapping.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
});

gulp.task('depsJS', function ()
{
    return gulp.src(['bower_components/modernizr/modernizr.js', 'bower_components/jquery/dist/jquery.min.js', 'bower_components/foundation/js/foundation.js',
    'bower_components/angular/angular.min.js', 'bower_components/angular-route/angular-route.min.js', 'bower_components/angular-sanitize/angular-sanitize.min.js','bower_components/angular-scroll/angular-scroll.min.js',
    'bower_components/d3/d3.min.js', 'bower_components/c3/c3.min.js', 'bower_components/d3plus/d3plus.js'])
        .pipe(concat('image_and_mapping_deps.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
});

gulp.task('default', function ()
{
    var js = gulp.src(appJavaScript);
    return js.pipe(concat('image_and_mapping.js'))
        .pipe(gulp.dest('src'));
});

gulp.task('buildJS', function ()
{
    var js = gulp.src(appJavaScript);
    return js.pipe(concat('image_and_mapping.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bin/'));
});

gulp.task('rename', function ()
{
    gulp.src('src/index_build.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('bin/'));
});




/** style tasks **/
gulp.task('depsCSS', function ()
{
    return gulp.src(['src/css/styles.css','bower_components/c3/c3.min.css'])
        .pipe(concat('css/image_and_mapping.css'))
        .pipe(gulp.dest('bin'));
});

gulp.task('sass', function ()
{
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);




/** run ngdocs **/
gulp.task('ngdocs', [], function ()
{
    var options = {
        html5Mode: true,
        startPage: '/api',
        title: 'Image Mapping Docs',
        titleLink: '/api'
    };
    return gulp.src(appJavaScript)
        .pipe(ngdocs.process(options))
        .pipe(gulp.dest('docs'));
});



/** run watch **/
gulp.task('watch', function ()
{
    /*browserSync({
        server: {
            baseDir: 'src/'
        }
    });*/
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.scss', ['sass']);
});


/** file clean up **/
gulp.task('cleanBin', function ()
{
    return gulp.src('bin/')
        .pipe(clean());
});

gulp.task('copyimg', function ()
{
    gulp.src('src/img/**/*.jpg')
        .pipe(gulp.dest('bin/img/'));

    gulp.src('src/img/**/*.png')
        .pipe(gulp.dest('bin/img/'));
});

gulp.task('copyPartials', function ()
{
    return gulp.src('src/partials/*.html')
        .pipe(gulp.dest('bin/partials/'));
});

gulp.task('copyfonts', function ()
{
    gulp.src('src/fonts/*.{ttf, woff, eof, svg}')
        .pipe(gulp.dest('bin/fonts/'));
});

gulp.task('replaceImagePath', function ()
{
    gulp.src('src/partials/*.html')
        .pipe(replace(/..\/src\/img/g, 'img'))
        .pipe(gulp.dest('bin/partials/'));
});






//staging task
gulp.task('staging', function (callback)
{
    runSequence('cleanBin', 'depsJS', 'scripts', 'ngdocs', callback);
});


//production task
gulp.task('build', function (callback)
{
    runSequence('cleanBin', 'depsJS', 'buildJS', 'ngdocs', 'sass', 'depsCSS', 
        'rename', 'copyimg', 'copyPartials', 'copyfonts', 'replaceImagePath', callback);
});
