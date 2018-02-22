const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const exec = require('child_process').exec;

// start lite server
gulp.task('lite-server', () => exec('npm run lite'));

// SCSS -> CSS
gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

// Watch SCSS files
gulp.task('watch', () => gulp.watch('./scss/**/*.scss', ['scss']));

// Watch SCSS and start lite server
gulp.task('dev', ['watch', 'lite-server']);

// default
gulp.task('default', ['dev']);