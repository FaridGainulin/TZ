import { src, dest, parallel, watch } from 'gulp'
import config from '../config.js'
import rigger from 'gulp-rigger'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import filter from 'gulp-filter'

const vendorCss = () => {
  return src(config.vendor.src)
    .pipe(filter(['*.css']))
    .pipe(rigger())
    .pipe(cleanCSS())
    .pipe(dest(config.vendor.dest))
}

const vendorJs = () => {
  return src(config.vendor.src)
    .pipe(filter(['*.js']))
    .pipe(rigger())
    .pipe(uglify())
    .pipe(dest(config.vendor.dest))
}

export const vendor = parallel(vendorCss, vendorJs)

export const vendorWatch = (done) => {
  watch(config.vendor.watch, vendor)

  done()
}
