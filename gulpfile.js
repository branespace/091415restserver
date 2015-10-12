var gulp = require('gulp');
var webpack = require('webpack-stream');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');
var Karma = require('karma').Server;

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js' 
      }
    }))
    .pipe(gulp.dest('test/client'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src(['!./node_modules/**/*', '**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('servertests', function() {
  return gulp.src('test/api_test/**/*tests.js')
    .pipe(gulpMocha({reporter: 'nyan'}))
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      if (this.seq.length === 1 && this.seq[0] === 'servertests'){
        process.exit();
      }
    }.bind(this));
});

gulp.task('watch', function() {
  return gulp.watch(['app/**/*'], ['build:dev']);
});

gulp.task('karmatests', ['webpack:test'], function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);
