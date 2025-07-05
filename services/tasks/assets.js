import { src, dest, watch } from 'gulp'
import replace from 'gulp-replace'
import { readPackageSync } from 'read-pkg';
import config from '../config.js'

const pkg = readPackageSync();

export const assets = () => {
  return src(config.assets.src, { encoding: false })
    .pipe(replace(/\{\{\s*\$name\s*\}\}/g, pkg.config.name))
    .pipe(dest(config.assets.dest))
}

export const assetsWatch = (done) => {
  watch(config.assets.watch, assets)

  done()
}
