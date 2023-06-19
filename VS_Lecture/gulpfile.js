"use strict"

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer"); /* проверка "can i use" и добавление (при необходимости) вендорных префиксов) */
const cssbeautify = require("gulp-cssbeautify"); /* Linter */
const sass = require("gulp-sass")(require("sass")); /* компилятор для .scss в .css */
const cssnano = require("gulp-cssnano"); /* minimized size and spaces for css */
const uglify = require("gulp-uglify"); /* minimized size and spaces for js */
const plumber = require("gulp-plumber"); /* антикраш при наличии ошибок в кодe */
const notify = require("gulp-notify") /* отображение ошибок кода (работает вместе с plumber) */
const panini = require("panini"); /* ??? */
const imagemin = require("gulp-imagemin"); /* сжатие картинок */
const rename = require("gulp-rename"); /* название для minimized файла */
const rigger = require("gulp-rigger"); /* собрать все js файлы в один */
const removeComments = require("gulp-strip-css-comments"); /* удаление комментов */
const del = require("del"); /* удаление всех файлов в dist */

/* Paths */
const srcPath = "src/"
const distPath = "dist/"


const path = {
    build: {
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/",        
    },
    src: {
        html: srcPath +"*.html",
        css: srcPath + "assets/css/*.css",
        js: srcPath + "assets/js/*.js",
        images: srcPath + "assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",        
    },
    watch: {
        html: srcPath +"**/*.html",
        css: srcPath + "assets/css/**/*.css",
        js: srcPath + "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",        
    },
    clean: "./" + distPath 
}


function html() {
    return src(path.src.html, {base: srcPath}) 
        .pipe(plumber()) 
        .pipe(dest(path.build.html))
}

function css() {
    return src(path.src.css, {base: srcPath + "assets/css/"}) 
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    sound: true,
                    title: "CSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        }))
        // .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zidex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))     
}

function js() {
    return src(path.src.js, {base: srcPath + "assets/js/"}) 
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end');
            }
        })) 
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
}

function images() {
    return src(path.src.images, {base: srcPath + "assets/images/"}) 
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.images))
}

function fonts() {
    return src(path.src.fonts, {base: srcPath + "assets/fonts/"}) 
}

function clean() {
    return del(path.clean)
}

function watchFiles(){
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts))
const watch = gulp.parallel(build, watchFiles)

exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch