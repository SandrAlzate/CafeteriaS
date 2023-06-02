const { src, dest, watch, series, parallel } = require("gulp");

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//imagenes 
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
//compilar sass
//pasos: 1 identificar archivo, 2 compilarla, 3 guardar el .css
    src('src/scss/app.scss')
    .pipe( sass() )
    .pipe( postcss ( [ autoprefixer() ]) )
    .pipe( dest ('build/css') )

    done();
}
function imagenes( ) {
    return src('src/img/**/*')
     .pipe( imagemin({ optimiacionLevel: 3 }) )
     .pipe( dest('build/img') )
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp() )
    .pipe( dest('build/img') )
}

function versionAvif() {
    return src('src/img/**/*.{png,jpg}')
    .pipe( avif())
}

function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
 
}

function tareaDefault() {
    console.log( 'soy la tarea por default');
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, css, dev );
