var gulp = require('gulp');

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
  // place code for your default task here
});
