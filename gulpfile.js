
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
  rename = require("gulp-rename"),
	dest = "editions/material/";

/********************************************************************
* Tasks
*******************************************************************/

gulp.task("clean", function (cb) {
  pump([
	  gulp.src([dest + "/themes", dest + "/plugins"], {read: false}),
    clean()
	  // no target
  ], cb);
});

gulp.task("clean", function (cb) {
  pump([
	  gulp.src([dest + "/themes", dest + "/plugins"], {read: false}),
    clean()
	  // no target
  ], cb);
});

gulp.task("tiddlers", function (cb) {
  pump([
		gulp.src(["src/**", "!**/*.js"]),
		gulp.dest(dest)
	], cb);
})

gulp.task("javascript", function (cb) {
  pump([
		gulp.src(["src/**/*.js"]),
		uglify({ compress: false, output: { comments: /^\\/ } }),
		gulp.dest(dest)
	], cb);
})

gulp.task("build", [], function (cb) {
  runSequence('clean', ['buildinfo', 'tiddlers', 'javascript', 'package.json'], cb)
});

gulp.task("package.json", [], function (cb) {
  gulp.src('package*.json')
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulp.dest('./editions/material/tiddlers/files/'));
});

// ref: https://stackoverflow.com/questions/28048029/running-a-command-with-gulp-to-start-node-js-server
gulp.task('server', function() {
	nodemon({
		watch: ["src", "editions/material"]
	}).on('restart', ['build']);
});

gulp.task("commit", [], shell.task([
  "git add -A",
  "git commit -a -m wip"
]));

gulp.task("push", [], shell.task([
  "git push"
]));

gulp.task("buildinfo", [], shell.task([
  "hack/buildinfo"
], { verbose: false }));

gulp.task('hack', function() {
	nodemon({
		watch: ["src", "editions/material"]
	}).on('restart', ['build', 'commit', 'push']);
});
