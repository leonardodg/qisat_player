// npm install --save-dev gulp gulp-iconfont gulp-iconfont-css gulp.spritesmith merge-stream gulp-sass gulp-rename gulp-typescript gulp-concat gulp-watch 

/**
 * Criar o merge de todos os estilos num unico arquivo 
 * Verificar lightbox 
 */

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontcss = require('gulp-iconfont-css');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject("tsconfig.json");
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// All files destination
var destination = 'dist';
// Font name QiSat Player
var fontName = 'qisat-player-icons';

// SVG directory
var svgDir = 'src/sass/svgs/';
// Images directory
var imagesDir = 'src/sass/images/';

// Sass Source
var scssFiles = 'src/sass/*.scss';
// Options for development
var sassDevOptions = { outputStyle: 'expanded' };
// Options for production
var sassProdOptions = { outputStyle: 'compressed' };

// TS Source
var tsFiles = 'src/ts/*.ts';
/*var tsFiles = [
  'src/ts/MenuContexto.ts',
  'src/ts/QiSatPlayer-v3.0.0.ts'
];*/


// Task 'iconfont' - Run with command 'gulp iconfont'
gulp.task('iconfont', function(){
  return gulp.src([svgDir + '*.svg'])
    .pipe(iconfontcss({
      fontName: fontName, // required
      targetPath: '../../' + svgDir + '_icons.scss', // Diretório do arquivo css de configuração do svg
      cssClass: 'fi', // Name of the generated CSS class/placeholder
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName, // required
      prependUnicode: true, // recommended option
      formats: ['eot', 'svg', 'ttf', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
      timestamp: Math.round(Date.now()/1000), // recommended to get consistent builds when watching files
    }))
    /*.on('glyphs', function(glyphs, options) {
      // CSS templating, e.g.
      console.log(glyphs, options);
    })*/
    .pipe(gulp.dest(destination + "/fonts"));
});

// Task 'sprite' - Run with command 'gulp sprite'
gulp.task('sprite', function () {
  var spriteData = gulp.src('./' + imagesDir + '*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    imgPath: '../images/sprite.png'
  }));

  var imgStream = spriteData.img.pipe(gulp.dest(destination + "/images"));
  var cssStream = spriteData.css.pipe(gulp.dest(imagesDir));
  return merge(imgStream, cssStream);
});

// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(destination + "/styles"));
});
// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(destination + "/styles"));
});

// Task 'typescript' - Run with command 'gulp typescript'
gulp.task('typescript', function() {
  return gulp.src(tsFiles).pipe(tsProject())
    .js.pipe(concat('bundle.js'))//jsFiles[jsFiles.length-1]
    .pipe(gulp.dest(destination));
});

/* Function Default */
gulp.task('default', function() {
  watch([scssFiles, tsFiles],gulp.series('iconfont', 'sprite', 'sassdev', 'typescript'));
});
