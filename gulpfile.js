import { series, parallel } from 'gulp'
import figlet from 'figlet';
import { clean } from './services/tasks/clean.js'
import { styles, stylesWatch } from './services/tasks/styles.js'
import { scripts, scriptsWatch } from './services/tasks/scripts.js'
import { pages, pagesWatch } from './services/tasks/pages.js'
import { images, imagesWatch } from './services/tasks/images.js'
import { assets, assetsWatch } from './services/tasks/assets.js'
import { fonts, fontsWatch } from './services/tasks/fonts.js'
import { zip } from './services/tasks/zip.js';
import { server } from './services/tasks/server.js'

console.log(figlet.textSync("Meccano 2.0"));

export const build = series(
  clean,
  parallel(
    pages,
    scripts,
  ),
  parallel(
    styles,
    images,
    fonts,
    assets
  )
)

export const watch = parallel(
  stylesWatch,
  scriptsWatch,
  pagesWatch,
  imagesWatch,
  fontsWatch,
  assetsWatch
)

export const serve = server

export default series(
  build,
  watch,
  serve,
)

export const prod = series(
  build,
  zip
)
