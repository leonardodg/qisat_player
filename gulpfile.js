// npm install --save-dev gulp gulp-sass gulp-watch gulp-rename gulp-typescript 
/*
# Install
git clone https://github.com/zurb/foundation-sites
cd foundation-sites
npm install
# Start the documentation
npm start
*/


var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
//var rename = require('gulp-rename');
//var typescript = require('gulp-typescript');
//var tsProject = typescript.createProject("tsconfig.json");

/*
 * Variables
 */
// Sass Source
var scssFiles = 'scss/*.scss';

// CSS destination
var cssDest = 'public/css';

// TS Source
//var tsFiles = 'ts/QisatPlayer-v3.0.0.ts';

// JS destination
//var jsDest = 'public/js';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
/*var sassProdOptions = {
  outputStyle: 'compressed'
}*/

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
/*gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('qisat-player-v2.1.0.min.css'))
    .pipe(gulp.dest(cssDest));
});

/*
 * Tasks TS
 */
// Remover Arquivo antigo do Player
/*gulp.task('clean', function (cb) {
  //del(jsDest + '/QiSatPlayer-v2.1.0.min.js', cb).
  del(jsDest + '/QiSatPlayer-v3.0.0.js', cb);
})

// Task 'tsdev' - Run with command 'gulp tsdev'
gulp.task('tsdev', function() {
  return gulp.src(tsFiles)
    .pipe(tsProject())
    .js.pipe(gulp.dest(jsDest));
});

// Task 'tsprod' - Run with command 'gulp tsprod'
/*gulp.task('tsprod', function() {
  return gulp.src(tsFiles)
    .pipe(tsProject(sassProdOptions))
    .js.pipe(gulp.dest(jsDest));
});

/*
 * Function Default
 */
gulp.task('default', function() {
  watch([scssFiles],gulp.series('sassdev'));
  //watch([scssFiles, tsFiles],gulp.series('sassdev', 'sassprod', 'tsdev'));
});
