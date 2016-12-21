var gulp = require('gulp'),
    maps= require('gulp-sourcemaps');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-file-include'),
    livereload = require('livereload'),
    serverLive = livereload.createServer({applyCSSLive :false});

var paths = {
    html: './src/html/*.html',
    components: ['script/components/*.jsx']
}
//html
gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(include({
                prefix: '@',
                basepath: './src/html/pub'
        }))
        .pipe(gulp.dest('./build/html'));
});
//sass
gulp.task('sass', function() {
    return gulp.src('./src/style/*.scss')
        .pipe(maps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))  //compact  compressed
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'Android >= 4.0',
                'iOS >= 6'
            ]
        }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./build/style'));
});
gulp.task('watch',()=>{
    gulp.watch('./src/style/*.scss',['sass']);
    gulp.watch('./src/html/**/*.html',['html']);

    serverLive.watch(__dirname + "/build/html/*.html");
    serverLive.watch(__dirname + "/build/style/*.css");
})