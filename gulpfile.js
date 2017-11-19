
/********************************************************************
* Imports
*******************************************************************/

var pump = require('pump'),
  gulp = require("gulp"),
	gutil = require("gulp-util"),
	clean = require('gulp-clean'),
	uglify = require("gulp-uglify"),
	nodemon = require('gulp-nodemon'),
	shell = require('gulp-shell'),
  runSequence = require('run-sequence').use(gulp),
  rename = require("gulp-rename")

/********************************************************************
* Tasks
*******************************************************************/

gulp.task("clean")

gulp.task("build", [], function (cb) {
  runSequence('clean', ['buildinfo', 'package.json', 'index.html', 'hack.html'], cb)
})

gulp.task("package.json", [], function (cb) {
  gulp.src('package*.json')
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulp.dest('./editions/material/tiddlers/files/'))
})

gulp.task("buildinfo", [], shell.task([
  "hack/buildinfo"
], { verbose: true }))

gulp.task("index.html", ['buildinfo'], shell.task([
  "node tiddlywiki.js editions/material --build"
]))

gulp.task("test", shell.task([
  "node tiddlywiki.js editions/test --build 2>&1 | tee test.out; ! grep -q ^Failures: test.out"
]))

// ref: https://stackoverflow.com/questions/28048029/running-a-command-with-gulp-to-start-node-js-server
gulp.task('server', function() {
	nodemon({
		watch: ["plugins", "themes", "editions/material"]
	}).on('restart', ['build'])
})

gulp.task('hack', function() {
	nodemon({
		watch: ["plugins", "themes", "editions/material"]
	}).on('restart', ['build', 'test'])
})

gulp.task("hack.html", ['buildinfo'], shell.task([
  "node tiddlywiki.js editions/hack-fs --build"
]))

gulp.task("commit", [], shell.task([
  "git add -A",
  "git commit -a -m wip"
]))

gulp.task("push", [], shell.task([
  "git push"
]))
