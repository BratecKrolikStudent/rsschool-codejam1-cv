const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

const PATH = {
  PUBLIC: './',
  SRC: './src',
  PAGE: './src/page',
  SASS: './src/sass',
  CSS: './css',
  IMAGE: './images'
};

gulp.task('sass', function() {
  return gulp.src(`${PATH.SASS}/app.scss`)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest(PATH.CSS))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function () {
  return gulp.src(`${PATH.PAGE}/index.pug`)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(PATH.PUBLIC));
});

gulp.task('image', function () {
  return gulp.src(`${PATH.SRC}/images/**/*.*`)
    .pipe(gulp.dest(PATH.IMAGE))
})

gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'pug', 'image'], function () {
  browserSync({
    server: {
      baseDir: PATH.PUBLIC
    },
    notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch(`${PATH.SASS}/**/*.scss`, ['sass']);
  gulp.watch(`${PATH.SRC}/**/*.pug`, ['rebuild']);
});

gulp.task('build', ['sass', 'pug', 'image']);

gulp.task('default', ['browser-sync', 'watch']);
