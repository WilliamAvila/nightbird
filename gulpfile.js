var gulp = require('gulp');

gulp.task('build',['bootstrap'], function (cb) {
    return gulp.src(["boilerplate/**/*",'!boilerplate/for_bootstrap{,/**}','!boilerplate/for_foundation{,/**}','!boilerplate/node_modules{,/**}'])
        .pipe(gulp.dest("generator-nightbird/generators/app/templates"), cb);
});

gulp.task('bootstrap',function(cb){
     return gulp.src("boilerplate/for_bootstrap/**/*")
        .pipe(gulp.dest("generator-nightbird/generators/bootstrap/templates"), cb);
});