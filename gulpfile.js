var gulp         = require('gulp'),
    plug         = require('gulp-load-plugins')(),
    autoprefixer = require('autoprefixer');


gulp.task( 'default', [ 'server', 'watch' ]);

/****
 *   Server/watch Tasks
 */
gulp.task( 'server', plug.shell.task([ 'npm run start' ]) );
gulp.task( 'watch', function(){

  gulp.watch( './posts/raw/**', ['compile-posts'] );
  gulp.watch( './src/templates/**', ['copy-templates'] );
  gulp.watch( './src/scss/**/*.scss', ['compile-scss'] );
  gulp.watch( './src/js/**', ['build-js'] );

});


/****
 *   Copy Tasks
 */
gulp.task( 'copy-all', [ 'copy-templates', 'copy-fonts', 'copy-images' ] );
gulp.task( 'copy-templates', function(){
  return gulp.src( './src/templates/**' )
    .pipe( gulp.dest( './public/templates/' ) );
});
gulp.task( 'copy-fonts', function() {
  return gulp.src( './src/font/**' )
    .pipe( gulp.dest( './public/font/' ) );
});
gulp.task( 'copy-images', function() {
  return gulp.src( './src/img/**' )
    .pipe(plug.imagemin())
    .pipe( gulp.dest( './public/img/' ) );
});


/****
 *   Markdown/Posts Tasks
 */
gulp.task( 'compile-posts', [ 'compile-markdown', 'copy-posts' ]);
gulp.task( 'compile-markdown', function(){
  return plug.shell.task(['npm run compile-posts']);
});
gulp.task( 'copy-posts', ['compile-markdown'], function(){
  return gulp.src( './posts/compiled/**' )
          .pipe( gulp.dest('./src/templates/posts/') );
});


/****
 *   CSS Tasks
 */
gulp.task( 'compile-scss', function(){
  return gulp.src( './src/scss/core.scss' )
          .pipe( plug.sass().on('error', plug.sass.logError ) )
          .pipe( gulp.dest( './public/css/' ) );
});
gulp.task( 'build-css', [ 'compile-css' ], function(){
  var postProcessors = [ autoprefixer({ browsers: [ 'last 4 versions', '> 2.5% in CA' ] }) ]
  return gulp.src( paths.css.src+'core.css' )
          .pipe(plug.postcss(postProcessors))
          .pipe(plug.cssnano())
          .pipe(gulp.dest( paths.css.dist ))
})


/****
 *   Javascript Tasks
 */
gulp.task( 'build-js', [ 'babel', 'js-compile' ]);
gulp.task( 'babel', function(){
  return gulp.src('./src/js/core.js')
        .pipe(plug.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/js/'));
});
gulp.task( 'js-compile', [ 'babel' ], function(){
  return gulp.src([ './src/js/lib/jquery.js', './src/js/lib/materialize.js', './public/js/core.js' ])
    .pipe(plug.concat('core.js'))
    .pipe(plug.uglify({mangle: false}))
    .pipe(gulp.dest('./public/js/'));
});
