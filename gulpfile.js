var gulp = require('gulp'),
		sass = require ('gulp-sass'),
		notify = require('gulp-notify'),
		filter = require('gulp-filter'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		livereload = require('gulp-livereload'),
		connect = require('connect'),
		serveIndex = require('serve-index'),
		serveStatic = require('serve-static'),
		pug = require('gulp-pug');
 
var config = {
	stylesPath: 'assets/styles',
	jsPath: 'assets/scripts',
	imagesPath: 'assets/images',
	templatesPath: 'assets/templates',
	outputDir: 'public/dist'
}



gulp.task('icons', function() {
	return gulp.src('./node_modules/font-awesome/fonts/**.*')
		.pipe(gulp.dest(config.outputDir + '/fonts'));
});


gulp.task('fonts', function() {
	return gulp.src('assets/fonts/**.*')
		.pipe(gulp.dest(config.outputDir + '/fonts'));
});

gulp.task('images', function() {
	return gulp.src(config.imagesPath + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.outputDir + '/images'))
});

gulp.task('css', function() {
	return gulp.src(config.stylesPath + '/main.scss')
		.pipe(sass({
				outputStyle: 'compressed',
				includePaths: [
					config.stylesPath,
					'./node_modules/bootstrap/scss',
					'./node_modules/font-awesome/scss'
				]
			}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.outputDir + '/css'));
});


gulp.task('jquery', function(){
	return gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest(config.outputDir + '/js'));
});


gulp.task('jquery-easing', function(){
	return gulp.src('./node_modules/jquery-easing/jquery.easing.1.3.js')
		.pipe(gulp.dest(config.outputDir + '/js'));
});


gulp.task('bootstrap-js', function(){
	return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
		.pipe(gulp.dest(config.outputDir + '/js'));
});


gulp.task('scrollreveal-js', function(){
	return gulp.src('./node_modules/scrollreveal/dist/scrollreveal.min.js')
		.pipe(gulp.dest(config.outputDir + '/js'));
});

gulp.task('jquery-parallax', function(){
	return gulp.src('./node_modules/jquery-parallax.js/parallax.min.js')
		.pipe(gulp.dest(config.outputDir + '/js'));
});

gulp.task('js', function() {
	return gulp.src(config.jsPath+'/*')
		.pipe(filter('**/*.js'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.outputDir + '/js'));
});

function handleError(err) {
  this.emit('end');
};

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(config.templatesPath + '/*.pug')
    .pipe(pug({
      locals: YOUR_LOCALS
    }).on('error', handleError))
    .pipe(gulp.dest('public'))
});

gulp.task('watch', function(){
	gulp.watch([config.stylesPath + '**/*.scss', config.stylesPath + '**/*.sass', config.stylesPath + '**/*.css'], ['css']);
	gulp.watch([config.jsPath + '**/*.js'], ['js']);
	gulp.watch([config.imagesPath + '/**/*'], ['images']);
	gulp.watch([config.templatesPath + '/*.pug'], ['templates']);
});

gulp.task('connect', function () {
    
    var serveApp = serveStatic('public');
    var serveWhich= 'public';
    
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic(serveWhich))
        .use(serveApp)
        .use(serveIndex(serveWhich));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:9000.');
        });
});

gulp.task('serve', ['connect', 'watch'], function () {

    livereload.listen();

    require('opn')('http://localhost:9000');
    
    var delay_livereload = function(timeout) {
      return function(vinyl) {
        setTimeout(function() { livereload.changed(vinyl) }, timeout)
      };
    }

    gulp.watch(['public/**/*']).on('change', delay_livereload(500));
    
});

gulp.task('default', ['templates', 'icons', 'fonts', 'images', 'css', 'jquery', 'jquery-easing', 'bootstrap-js', 'scrollreveal-js', 'jquery-parallax', 'js']);