var gulp = require('gulp'),
  shell = require('gulp-shell'),
  imagemin = require('gulp-imagemin'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync');

var imgsrc = './src/*.sketch';
var tmpdir = './tmp/';
var imgdir = './dist/images/';

gulp.task('bs', function() {
  browserSync.init(null, {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('sketch', function () {
  return gulp.src(imgsrc,  {read: false})
    .pipe(shell([
      'sketchtool export slices --output="' + tmpdir + '" <%= file.path %>'
    ]))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('optim', function() {
  return gulp.src(tmpdir + '*')
    .pipe(imagemin({
      optimizationLevel: 3
    })) // See gulp-imagemin page.
    .pipe(gulp.dest(imgdir));
});

gulp.task('export', function() {
  runSequence(
    'sketch',
    'optim'
  );
});

gulp.task('watch', function() {
  gulp.watch('./src/**', ['export']);
});

gulp.task('default', ['bs', 'export', 'watch']);