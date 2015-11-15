var gulp = require('gulp');
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("./src/assets/scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

 // création d'une nouvlle tahe : 'sass'
gulp.task('sass', function () {
	// définition de la tache
  gulp.src('./src/assets/scss/**/*.scss') //définition d'un répertoire source
    .pipe(sass().on('error', sass.logError)) // execution Sass
    .pipe(gulp.dest('./src/assets/css')) //écriture dans destination
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});

//Ici la tache par default
gulp.task('default', function() {

});

gulp.task('build', ['buildwww', 'buildImg']);

gulp.task('buildwww', function() {
  var assets = useref.assets();

  return gulp.src('./src/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('www'));
});

gulp.task('buildImg', function() {
  return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('build'));
});
