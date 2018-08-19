'use strict';
const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

gulp.task('clean', () => del(['./styles.css', './styles.css.map']));

gulp.task('styles', [], () =>
	gulp
		.src('./less/styles.less')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.less())
		.pipe(
			plugins.autoprefixer({
				browsers: ['last 3 versions'],
			}),
		)
		.pipe(plugins.concat('styles.css'))
		.pipe(plugins.cleancss())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('./')),
);

gulp.task('watch-styles', () => gulp.watch('./less/**/*.less', 'styles'));

gulp.task('watch', () => runSequence(['clean'], 'styles', ['watch-styles']));

gulp.task('_browser-reload', cb => {
	browserSync.reload();
	cb();
});

gulp.task('default', cb => runSequence(['clean'], 'styles', cb));
