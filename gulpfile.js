const { src,dest, watch, series, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ) {
//compilar sass
//pasos: 1 identificar archivo, 2 compilarla, 3 guardar el .css
    src('src/scss/app.scss')
    .pipe( sass() )
    .pipe( postcss ( [ autoprefixer() ] ) )
    .pipe( dest ('build/css') )

    done();
}

function dev() {
    watch( 'src/scss/**/*.scss', css);
 
}

function tareaDefault() {
    console.log( 'soy la tarea por default');
}

exports.css = css;
exports.dev = dev;
exports.default = tareaDefault;
