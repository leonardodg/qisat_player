var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontcss = require('gulp-iconfont-css');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var { config } = require('./config');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var watchify = require("watchify");
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

// Config para rodar desativar validação de certificado ao roda gulp localhost
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// environment variables
process.env.NODE_ENV = config.environment;

var is_production = function () {
    return (config.environment == 'production') ? true : false;
}

/**
 * Tarefa Responsável por criar as fonts do projeto e o style arquivo _icons.scss
 * 
 * Style - Destino = 'src/sass/components/_icons.scss'
 * Fonts - Destino = 'dist/fonts/'
 * 
 * Run Task - Run with command 'gulp build-fonts'
 */
gulp.task('build-fonts', function () {
    return gulp.src([config.path.src.svg + '*.svg'])
        .pipe(iconfontcss({
            fontName: config.fontName, // required
            targetPath: '../../' + config.path.src.sass + 'components/_icons.scss', // Diretório do arquivo css de configuração do svg
            cssClass: 'fi', // Name of the generated CSS class/placeholder
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: config.fontName, // required
            prependUnicode: true, // recommended option
            formats: ['eot', 'svg', 'ttf', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
            timestamp: Math.round(Date.now() / 1000), // recommended to get consistent builds when watching files
        }))
        .pipe(gulp.dest(config.path.build.fonts));
});

/**
 * Taferas reponsável em criar arquivo final do Sprite de Images
 * 
 * Run Task - Run with command 'gulp sprite'
 * 
 * Style - Destino = config.path.src.sass + 'componets' : 'src/sass/componets/_sprite.scss'
 * 
 * Image - Origem = config.path.src.sprite : 'src/images/'
 *       - Destino = config.path.build.images : 'dist/images/'
 */
gulp.task('build-sprite', function () {
    var spriteData = gulp.src(config.path.src.sprite + '*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../images/sprite.png'
        }));

    var imgStream = spriteData.img.pipe(gulp.dest(config.path.build.images));
    var cssStream = spriteData.css.pipe(gulp.dest(config.path.src.sass + 'components'));
    return merge(imgStream, cssStream);
});

// Task 'styles' - Run with command 'gulp styles'
gulp.task('build-styles', function () {
    var scssFiles = config.path.src.sass + 'app.scss';
    var outputStyle = is_production() ? 'compressed' : 'expanded';

    var sassOptions = {
        outputStyle: outputStyle,
        includePaths: ['node_modules']
    };

    return gulp.src(scssFiles)
        .pipe(sass(sassOptions)
            .on('error', sass.logError))
        .pipe(rename({ basename: "qisat-player" }))
        .pipe(gulp.dest(config.path.build.css))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(config.path.build.css))
});

var watchedBrowserify =
    watchify(
        browserify({
            "basedir": ".",
            "entries": "src/ts/index.ts",
            "debug": (is_production() == false),
            "cache": {},
            "packageCache": {}
        })
            .plugin(tsify)
            .transform(babelify, {
                "extensions": [".js", ".ts"],
                "presets": ['@babel/preset-env']
            })
    );

function buildJs() {

    if (is_production()){

        return watchedBrowserify
            .bundle()
            .on('error', function (error) {
                console.log(error.message);
                this.emit('end');
            })
            .pipe(streamify(uglify()))
            .pipe(source("index.js"))
            .pipe(gulp.dest(config.path.build.local));

    }else{
        return watchedBrowserify
        .bundle()
        .on('error', function (error) {
            console.log(error.message);
            this.emit('end');
        })
        .pipe(source("index.js"))
        .pipe(gulp.dest(config.path.build.local));
    }
}
gulp.task('build-js', buildJs);
watchedBrowserify.on("update", buildJs);
watchedBrowserify.on('log', function (msg) {
    console.log(msg);
});

// Task 'copy-images' - Run with command 'gulp copy-images'
gulp.task('build-images', function () {
    return gulp.src([
        config.path.src.images + '*.*',
        'node_modules/lightbox2/dist/images/**/*',
        '!' + config.path.src.svg,
        '!' + config.path.src.sprite,
        '!' + config.path.src.svg + '**/*',
        '!' + config.path.src.sprite + '**/*'
    ])
        .pipe(gulp.dest(config.path.build.images));
});

/* Function Default */
return gulp.task('build', gulp.series('build-fonts', 'build-sprite', 'build-styles', 'build-images', 'build-js'));
gulp.task('default', gulp.series('build'), function () {
    watch([config.path.src.sass + '**/*.scss', config.path.src.ts + '**/*.ts'],
        gulp.series('build-styles', 'build-js'));
});


// Static server
gulp.task('browser-sync', function (callback) {

    var httpProxy = proxy('/', {
        target: "http://local-player.dev.com.br",
        changeOrigin: true // for vhosted sites
    });

    browserSync.init({
        port: 8080,
        server: {
            baseDir: '/var/www/html/player/dist/',
            middleware: [httpProxy]
        },
        startPath: '/samples/basic.html',
        files: [config.path.build.local + '**/*']
    });

    callback();

});

/**
 * Task Run - build-samples
 * Copy Files to Test QiSatPLayer - Basic
 * 
 * Copy Files:
 *      Origin = ./src/samples
 *      Destination = ./dist/samples
 * 
 */
gulp.task('build-samples', function () {
    return gulp.src(config.path.src.samples + '**/*')
        .pipe(gulp.dest(config.path.build.samples));
});

gulp.task('watch:samples', function () {
    watch(config.path.src.samples, gulp.series('build-samples'));
});