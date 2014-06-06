var gulp = require('gulp'),
  changed = require('gulp-changed'),
  shell = require('gulp-shell'),
  browserSync = require('browser-sync');

var imgsrc = './src/*.sketch';
var imgdir = './images/';

gulp.task('sketch', function () {
  return gulp.src(imgsrc,  {read: false})
    .pipe(shell([
      'sketchtool export slices --output="' + imgdir + '" <%= file.path %>'
    ]))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('bs', function() {
  browserSync.init(null, {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/**', ['sketch']);
});

gulp.task('default', ['bs', 'sketch', 'watch']);