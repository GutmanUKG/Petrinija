// import gulp from 'gulp';
// import dartSass from 'sass'
// import gulpSass  from 'gulp-sass'
// import postcss from 'gulp-postcss'
// const postSass = postcss(dartSass)
// const sass = gulpSass(dartSass)
// import sourcemaps  from 'gulp-sourcemaps';
// import image from 'gulp-image';
// import babel from 'gulp-babel'
//
// import autoprefixer from 'gulp-autoprefixer'
// import {create as bsCreate} from 'browser-sync';
//
// const browserSync = bsCreate();
// const pathJs = './assets/js/**/*'
// const pathJsOut = './js'
// const pathScss = './assets/scss/**/*.scss'
// const pathScssOut = './css'
// const pathImg = './assets/imgs/full_imgs/**/*'
// const pathImgOut = './assets/imgs/optimize_imgs'
//
// gulp.task('buildSass', ()=>{
//     return gulp.src(pathScss)
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(autoprefixer({
//             cascade: false ,
//             flexbox: true,
//             grid: true,
//             browsers: ['last 3 versions']
//         }))
//         // .pipe(clean())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(pathScssOut))
//         // .pipe(browserSync.reload())
//         .pipe(browserSync.stream())
// });
//
// gulp.task('img', ()=>{
//     return gulp.src(pathImg)
//         .pipe(image())
//         .pipe(gulp.dest(pathImgOut))
// });
//
//
// gulp.task('buildJs', ()=>{
//     return gulp.src(pathJs)
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(pathJsOut))
//         .pipe(browserSync.stream())
// });
//
// gulp.task('serve',  ()=> {
//     browserSync.init({
//         server: {
//             baseDir: "./",
//             // proxy: 'https://localhost:3000',
//             // https: true
//         }
//     });
//
//     gulp.watch("./css/**/*.css", browserSync.reload);
//     // gulp.watch("./js/**/*.js", browserSync.reload);
//     gulp.watch("./*.html").on('change', browserSync.reload);
// });
//
//
// gulp.task('watch', ()=>{
//     gulp.watch(pathScss, gulp.series('buildSass'))
//     // gulp.watch(pathImg, gulp.series('optimize_imgs'))
//     gulp.watch(pathJs, gulp.series('buildJs'))
//     gulp.watch(pathJs, gulp.series('serve'))
//     gulp.watch(pathScss, gulp.series('serve'))
// });
//
// gulp.task('default', gulp.series('buildSass', 'buildJs'  ,'watch'))
// gulp.task('serve' ,gulp.series('serve'))
// gulp.task('img', gulp.series('img'))
//
//

const gulp = require('gulp');
//?????????????? ?????? postcss
const postcss = require('gulp-postcss')
//???????????????????????????? ??????????
const rename = require('gulp-rename');
//????????????????????????
const autoprefixer = require('autoprefixer');
//???? scss ?? css
const Nested = require('postcss-nested')
//???????????????????????????? ????????????????
const browserSync = require('browser-sync').create();
//??????????
const sourcemaps = require('gulp-sourcemaps')
//?????????????????? css4
const postcssPresetEnv = require('postcss-preset-env');
//???????????????????????????? ???????????????????? ?? ???????????????????? ???????????????? ???? animate.css
const postcssAnimation = require('postcss-animation')
//???????????????????????????? ???????????????????? ?? ???????????????????? ?????????????? ???? GoogleFonts
const pfm = require('postcss-font-magician');
//?????????????????? ?????????????????? ????????????????
const atImport = require('postcss-import')
//?????????????????? ????????????????????
const pav = require('postcss-advanced-variables')
//?????????????????????????? ??????
const bem = require('postcss-bem')
//???????????????????? calc css
const calc = require('postcss-calc')
//???????????????????? ?????????? ????????????????
const sortMediaQueries = require('postcss-sort-media-queries')

//SVG SPRITE
const svgSprite = require('gulp-svg-sprite')

//???????????? JS ES6 ?? ES5
const babel = require('gulp-babel')



const pathJs = './assets/js/**/*'
const pathJsOut = './js'
const pathScss = './assets/scss/**/*.scss'
const pathScssOut = './css'
const pathImg = './assets/imgs/full_imgs/**/*'
const pathImgOut = './assets/imgs/optimize_imgs'
const pathSVG = './assets/svg/*.svg'
const pathSVGOut = './assets/sprite/'
gulp.task('svgSprite', ()=>{
    return gulp.src(pathSVG)
        .pipe(svgSprite({
            mode: {
                stack:{
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(pathSVGOut))
})
gulp.task('serve',  ()=> {
    browserSync.init({
        server: {
            baseDir: "./",
        }
    });
    gulp.watch("./css/**/*.css", browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('buildJs', ()=>{
    return gulp.src(pathJs)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pathJsOut))
        .pipe(browserSync.stream())
});



gulp.task('buildSass', function () {
    let plugins = [
        autoprefixer({browsers: ['last 2 version']}),
        require('postcss-advanced-variables'),
        require('postcss-import')(),
        Nested(),
        postcssPresetEnv(),
        atImport(),
        postcssAnimation(),
        pfm(),
        calc(),
        sortMediaQueries({
            sort: 'mobile-first'
        })
    ];
    return gulp.src(pathScss)
        .pipe(postcss(plugins))

        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(pathScssOut))
        .pipe(browserSync.stream())
});

gulp.task('watch', ()=>{
    gulp.watch(pathScss, gulp.series('buildSass'))
    // gulp.watch(pathImg, gulp.series('optimize_imgs'))
    gulp.watch(pathJs, gulp.series('buildJs'))
    gulp.watch(pathJs, gulp.series('serve'))
    gulp.watch(pathScss, gulp.series('serve'))
})
gulp.task('default', gulp.series('buildSass', 'buildJs',  'watch'))


