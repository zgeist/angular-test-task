var gulp        = require('gulp');
var ts          = require('gulp-typescript');
var stylus      = require('gulp-stylus');
var gutil       = require('gulp-util');
var connect     = require('gulp-connect');
var karma       = require('gulp-karma');
var sourcemaps  = require('gulp-sourcemaps');

function errorHandler( err ){

    gutil.log( err.toString() );

    this.emit('end');
}

gulp.task('compile-js', function(){
   return gulp.src('./app/_all.ts')
       .pipe(sourcemaps.init())
       .pipe(ts({
           target:'es5',
           noImplicitAny: false,
           out: 'Application.js'
       }))
       .on('error', errorHandler)
       .pipe(sourcemaps.write('/'))
       .pipe(gulp.dest('./build/'))
       .pipe(connect.reload());
});



gulp.task('compile-css', function(){
   return gulp.src('./app/stylus/*.styl')
       .pipe(stylus())
       .on('error', errorHandler)
       .pipe(gulp.dest('./build/'))
       .pipe(connect.reload());
});

gulp.task('watch', function(){
   gulp.watch( 'app/**/*.ts', ['compile-js'] );
   gulp.watch( 'app/stylus/*.styl', ['compile-css'] );
});

gulp.task('app:connect', function() {
    connect.server({
        root: './',
        port: 4000,
        livereload: true
    });
});

var testFiles = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'build/Application.js',
    '**/*.spec.ts'
];

gulp.task('app:test', function (done) {
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});


gulp.task('default', ['compile-js', 'compile-css', 'app:connect', 'watch']);