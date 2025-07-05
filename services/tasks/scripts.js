import { src, dest, watch } from 'gulp'
import config from '../config.js'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'

export const scripts = () => {
  return src(config.scripts.src)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(dest(config.scripts.dest))
}

export const scriptsWatch = (done) => {
  watch(config.scripts.watch, scripts)

  done()
}
