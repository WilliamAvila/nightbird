var gulp = require('gulp');

gulp.task('build', function (cb) {
    return gulp.src("boilerplate/**/*")
        .pipe(gulp.dest("generator-nightbird/generators/app/templates"), cb);
});