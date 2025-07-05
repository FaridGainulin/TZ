import { src, dest, watch } from 'gulp'
import config from '../config.js'
import newer from 'gulp-newer'

export const images = () => {
  return src(config.images.src, { encoding: false })
    .pipe(newer(config.images.dest))
    .pipe(dest(config.images.dest))
}

export const imagesWatch = (done) => {
  watch(config.images.watch, images)

  done()
}
