"use strict"

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer"); /* ??? */
const cssbeautify = require("gulp-cssbeautify"); /* Linter */
const sass = require("gulp-sass")(require("sass")); /* компилятор для .scss в .css */
const cssnano = require("gulp-cssnano"); /* minimized size and spaces for css */
const uglify = require("gulp-uglify"); /* minimized size and spaces for js */
const plumber = require("gulp-plumber"); /* обход ошибок */
const panini = require("panini"); /* ??? */
const imagemin = require("gulp-imagemin"); /* ??? */
const rename = require("gulp-rename"); /* название для minimized файла */
const rigger = require("gulp-rigger"); /* собрать все js файлы в один */
const removeComments = require("gulp-strip-css-comments"); /* удаление комментов */
const del = require("del"); /* ??? */

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
        .pipe(plumber()) 
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
    .pipe(plumber()) 
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min",
        extname: ".js"
    }))
    .pipe(dest(path.build.js))
}




exports.html = html
exports.css = css
exports.js = js