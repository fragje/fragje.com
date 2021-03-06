var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var svgSprite   = require('gulp-svg-sprites');
var svg2png     = require('gulp-svg2png');
var filter      = require('gulp-filter');
var modulizr    = require('gulp-modulizr');
var addSrc     = require('gulp-add-src');
var preprocess  = require('gulp-preprocess');
var cssMin      = require('gulp-minify-css');
var hologram    = require('gulp-hologram');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var del         = require('del');
var imagemin    = require('gulp-imagemin');
var jpegoptim   = require('imagemin-jpegoptim');
var pngquant    = require('imagemin-pngquant');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var ghPages     = require('gulp-gh-pages');
var rename      = require('gulp-rename');
var cache       = require('gulp-cache');
var cp          = require('child_process');

var env = process.env.NODE_ENV;

// Input and output path
var path = {
    dest: './public/',
    src: './source/',
    jekyll: './jekyll/',
    bower: './bower_components/'
};

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-layouts', 'jekyll-build'], function () {
    browserSync.reload();
});

// Delete destination folder
gulp.task('clean', function() {
    del([path.dest], function (err) {
        console.log('Files deleted');
    })
});

// Copy root level files and folders
gulp.task('copy-files', function() {
    return gulp.src([
        // path.src + 'CNAME',
        // path.src + 'bower_components/jquery/**/jquery.min.js'
    ], { base: '.' }) // base keeps original path
        .pipe(gulp.dest( path.dest));
});

// Copy misc assets
gulp.task('copy-assets', function() {
    return gulp.src([
        // path.src + 'fonts/**/*'
    ], { base: path.src }) // base keeps original path
        .pipe(gulp.dest( path.dest + 'assets'));
});

// Markup task
// gulp.task('html', function() {
//   return gulp.src([path.src + 'html/**/*.html', '!' + path.src + 'html/_includes/**/*.html'])
//     .pipe(fileinclude({
//       prefix: '@@',
//       basepath: path.src + 'html/_includes'
//     }))
//     .pipe(preprocess()) // Run with $ NODE_ENV=production gulp html
//     .pipe(gulp.dest(path.dest))
//     .pipe(browserSync.reload({stream:true}));
// 
// });

// Image task
gulp.task('img', function () {
    return gulp.src([path.src + 'images/**/*', '!' + path.src + 'images/sprite/export/**/*'])
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [
                pngquant({ quality: '65-80', speed: 4 }),
                jpegoptim({max: 70})
            ]
        })))
        .pipe(gulp.dest(path.dest + 'assets/img'));
});

// Javascript tasks
gulp.task('js', function() {
    return gulp.src([
            path.src + 'javascript/vendor/*.js',
            path.bower + 'jquery/dist/jquery.js',
            path.src + 'javascript/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(path.dest + 'assets/js/'))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest + 'assets/js'))
        .pipe(browserSync.reload({stream:true}));
});

// Build custom modernizer script
// Manual task
gulp.task("modernizr", function() {
    return gulp.src("bower_components/modernizr/modernizr.js")
        .pipe(modulizr([
            // Add what you want modernizer to include
            // https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js
            "cssclasses",
            "svg",
            "url-data-uri"
        ]))
        .pipe(addSrc([
            "bower_components/modernizr/feature-detects/url-data-uri.js"
        ]))
        .pipe(concat("modernizr.js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.dest + "assets/js"));
});

// Svg task
gulp.task('sprite', ['img'], function() {
    return gulp.src(path.src + 'images/sprite/*.svg')
        .pipe(svgSprite({
            selector: 'icon-%f',
            baseSize: 16,
            padding: 5,
            cssFile: '../../source/sass/components/_sprite-automatic.scss',
            svg: {
                sprite: "img/sprite/export/sprite.svg"
            }
        }))
        .pipe(gulp.dest(path.dest + 'assets'))
        .pipe(filter('**/*.svg'))
        .pipe(svg2png())
        .pipe(gulp.dest(path.dest + 'assets'));
});

// Living styleguide
gulp.task('styleguide', function() {
    return gulp.src('./hologram_config.yml')
        .pipe(hologram({ bundler: true }));
});

// Browser sync task
gulp.task('browser-sync', ['build'], function() {
    browserSync({
        server: {
            baseDir: 'public'
        }
    });
});

// Sass tasks
gulp.task('sass', function () {
    return gulp.src(path.src + 'sass/*.scss')
        .pipe(sass({
            errLogToConsole: true // Prevent gulp from breaking on sass error
            }))
        // .pipe(prefix(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
        .pipe(gulp.dest(path.dest + 'assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(cssMin())
        .pipe(rename({ suffix:".min"}))
        .pipe(gulp.dest(path.dest + 'assets/css'))
        .pipe(browserSync.reload({stream:true}));
});

// Jekyll layout preprocess
gulp.task('jekyll-layouts', function() {
    return gulp.src([path.src + 'jekyll-layouts/**/*.html'])
        .pipe(preprocess()) // Run with $ NODE_ENV=production gulp html
        .pipe(gulp.dest(path.jekyll + '_layouts-automated'))
        .pipe(browserSync.reload({stream:true}));
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(path.src + 'sass/**/*.scss', ['sass', 'styleguide']);
    gulp.watch(path.src + 'images/sprite/*.svg', ['sprite']);
    gulp.watch(path.src + 'javascript/**/*.js', ['js']);
    gulp.watch(path.src + 'html/**/*.html', ['html']);
    gulp.watch([
        path.src + 'jekyll-layouts/**/*.html',
        path.jekyll + '**/*'
    ], ['jekyll-rebuild']);
});

// Deployment tasks
gulp.task('deploy-gh', function () {
    return gulp.src(path.dest + '**/*')
        .pipe(ghPages({
            cacheDir: './.git-cache'
        }));
});

// Build task
gulp.task('build', ['jekyll-layouts', 'jekyll-build', 'sass', 'js', 'styleguide', 'img', 'sprite', 'copy-files', 'copy-assets']);

// Default task
gulp.task('default', ['browser-sync', 'watch']);
