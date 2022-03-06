import pkg from 'gulp'
const {
  gulp,
  src,
  dest,
  parallel,
  series,
  watch
} = pkg

import browserSync from 'browser-sync'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import sassglob from 'gulp-sass-glob'
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
// import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import rsync from 'gulp-rsync'
import del from 'del'
import pxtoviewport from 'postcss-px-to-viewport'
import nunjucksRender from 'gulp-nunjucks-render'

const fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

const sass = gulpSass(dartSass)

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    ghostMode: {
      clicks: false
    },
    notify: false,
    online: true,
    // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
  })
}

function scripts() {
  return src(['app/js/*.js', '!app/js/*.min.js'])
    .pipe(webpackStream({
      mode: 'production',
      performance: {
        hints: false
      },
      // plugins: [
      //   new webpack.ProvidePlugin({
      //     $: 'jquery',
      //     jQuery: 'jquery',
      //     'window.jQuery': 'jquery'
      //   }), // jQuery (npm i jquery)
      // ],
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['babel-plugin-root-import']
            }
          }
        }]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false
              }
            },
            extractComments: false
          })
        ]
      },
    }, webpack)).on('error', (err) => {
      this.emit('end')
    })
    .pipe(dest('dist/js'))
    .pipe(src('app/js/packages/**/*.*'))
    .pipe(dest('dist/js/packages'))
    .pipe(browserSync.stream())
}

function styles() {
  return src([`app/styles/*.*`, `!app/styles/_*.*`])
    .pipe(sassglob())
    .pipe(sass({
      'include css': true,
      includePaths: ["node_modules"]
    }))
    .pipe(postCss([
      pxtoviewport({
        unitToConvert: 'rpx',
        viewportWidth: 1920,
        viewportUnit: 'vw'
      }),
      pxtoviewport({
        unitToConvert: 'mrpx',
        viewportWidth: 750,
        viewportUnit: 'vw',
        mediaQuery: true
      }),
      autoprefixer({
        grid: 'autoplace'
      }),
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      })
    ]))
    .pipe(concat('app.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/images/**/*'])
    // .pipe(changed('app/images/dist'))
    // .pipe(imagemin())
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
}

function buildcopy() {
  return src([
      '{app/js,app/css}/*.min.*',
      'app/images/**/*.*',
      '!app/images/src/**/*',
      'app/fonts/**/*'
    ], {
      base: 'app/'
    })
    .pipe(dest('dist'))
}

async function html() {
  return src('app/*.html')
    .pipe(nunjucksRender({
      path: ['app/templates']
    }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

async function cleandist() {
  del('dist/**/*', {
    force: true
  })
}

function deploy() {
  return src('dist/')
    .pipe(rsync({
      root: 'dist/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // clean: true, // Mirror copy with file deletion
      include: [ /* '*.htaccess' */ ], // Included files to deploy,
      exclude: ['**/Thumbs.db', '**/*.DS_Store'],
      recursive: true,
      archive: true,
      silent: false,
      compress: true
    }))
}

function startwatch() {
  watch(`app/styles/**/*`, {
    usePolling: true
  }, styles)
  watch(['app/js/**/*.js', '!app/js/**/*.min.js'], {
    usePolling: true
  }, scripts)
  watch('app/images/**/*', {
    usePolling: true
  }, images)
  watch('app/**/*.html', {
    usePolling: true
  }, html)
  // watch(`app/**/*.{${fileswatch}}`, {
  //   usePolling: true
  // }).on('change', browserSync.reload)
}

export {
  scripts,
  styles,
  images,
  deploy
}
export let assets = series(scripts, styles, images, html)
export let build = series(cleandist, images, scripts, styles, html)

export default series(scripts, styles, images, html, parallel(browsersync, startwatch))