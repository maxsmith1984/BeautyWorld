let preprocessor = 'sass';
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('compress-images');
const clean = require('gulp-clean');


function browsersync() {
    browserSync.init({
        server: { baseDir: 'src/' },
        notify: false,
        online: true
    })
}

function styles() {
    return src('src/' + preprocessor + '/main.scss')
        .pipe(eval(preprocessor)())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], grid: true }))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
        .pipe(dest('src/css/'))
        .pipe(browserSync.stream())
}

async function images() {
    imagecomp(
        "src/images/src/**/*",
        "src/images/dest/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
        { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanimg() {
    return src('src/images/dest/', { allowEmpty: true }).pipe(clean())
}

function buildcopy() {
    return src([
        'src/css/**/*.min.css',
        'src/fonts/**/*',
        'src/images/dest/**/*',
        'src/**/*.html',
    ], { base: 'src' })
        .pipe(dest('dist'))
}

function cleandist() {
    return src('dist', { allowEmpty: true }).pipe(clean())
}

function startwatch() {
    watch('src/**/' + preprocessor + '/**/*', styles);

    watch('src/**/*.html').on('change', browserSync.reload);

    watch('src/images/src/**/*', images);
}

exports.images = images;
exports.cleanimg = cleanimg;

exports.build = series(cleandist, styles, images, buildcopy);
exports.default = parallel(styles, browsersync, startwatch);