var gulp = require('gulp');
var webpack = require('webpack-stream');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src(['!./node_modules/**/*', '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*tests.js')
    .pipe(gulpMocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  return gulp.watch(['app/**/*'], ['build:dev']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('tests', ['jshint', 'test']);
gulp.task('default', ['build:dev']);
