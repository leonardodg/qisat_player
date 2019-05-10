// npm install --save-dev gulp gulp-sass gulp-watch gulp-rename gulp-typescript merge2 gulp-concat gulp-clean 

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject("tsconfig.json");
var merge2 = require('merge2');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

/*
 * Variables
 */
// Sass Source
var scssFiles = 'scss/*.scss';

// CSS destination
var cssDest = 'public/css';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

// TS Source
var tsFiles = 'ts/*.ts';

// JS Source
var jsTemp = 'ts/js';

// JS destination
var jsDest = 'public/js';

// JS Files to Merge
var jsFiles = [
  'MenuContexto.js',
  'QiSatPlayer-v3.0.0.js'
]

/*
 * Tasks SASS
 */
// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions).on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(cssDest));
});

/*
 * Tasks TS
 */
// Task 'tsdev' - Run with command 'gulp tsdev'
gulp.task('cleanJs', function () {
  var delFile = gulp.src(jsDest + "/" + jsFiles[jsFiles.length-1], {allowEmpty: true});
  if(delFile)
    return delFile.pipe(clean({force: true}));
  return;
});
gulp.task('tsdevCreate', function() {
  return gulp.src(tsFiles)
    .pipe(tsProject())
    .js.pipe(gulp.dest(jsTemp));
});
gulp.task('tsConcat', function() {
  var mergeFiles = [];
  for (var key in jsFiles) {
    mergeFiles.push(jsTemp + "/" + jsFiles[key]);
  }
  return merge2( gulp.src(mergeFiles) )
    .pipe(concat(jsFiles[jsFiles.length-1]))
    .pipe(gulp.dest(jsDest));
});
gulp.task('cleanTs', function () {
  return gulp.src(jsTemp)
    .pipe(clean({force: true}));
});

gulp.task('tsdev', gulp.series('cleanJs', 'tsdevCreate', 'tsConcat', 'cleanTs'));
//gulp.task('tsprod', gulp.series('cleanJs', 'tsdevCreate', 'tsConcat', 'cleanTs'));

/*
 * Function Default
 */
gulp.task('default', function() {
  watch([scssFiles, tsFiles],gulp.series('sassdev', 'tsdev'));
  //watch([scssFiles, tsFiles],gulp.series('sassprod', 'tsprod'));
});
