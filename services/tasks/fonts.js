import { src, dest, watch } from 'gulp'
import config from '../config.js'

export const fonts = () => {
  return src(config.fonts.src, { encoding: false })
    .pipe(dest(config.fonts.dest))
}

export const fontsWatch = (done) => {
  watch(config.fonts.watch, fonts)

  done()
}
