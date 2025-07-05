import { series, src, dest, watch } from 'gulp'
import { globSync } from 'glob'
import path from 'path'
import fs from 'fs'
import config from '../config.js'
import posthtml from 'gulp-posthtml'
import htmlmin from 'gulp-htmlmin'
import gulpif from 'gulp-if'
import plumber from 'gulp-plumber'
import posthtmlComponent from 'posthtml-component'
import posthtmlExpressions from 'posthtml-expressions'
import posthtmlBeautify from 'posthtml-beautify'
import posthtmlReplace from 'posthtml-replace'
import { readPackageSync } from 'read-pkg';

const production = process.env.NODE_ENV === 'production'
const pkg = readPackageSync();
const TAG_PREFIX = 'x-'

const htmlReplace = (tag, attr, from, to) => {
  return {
    match: {
      tag
    },
    attrs: {
      [attr]: {
        from,
        to
      }
    }
  }
}

let folders = []

const locals = {
  $name: pkg.config.name
}

const plugins = [
  posthtmlExpressions({ locals }),
  posthtmlComponent({
    root: './',
    tag: "component",
    attribute: "src",
    yield: "slot",
    tagPrefix: TAG_PREFIX,
    folders,
    expressions: { locals },
  }),
  posthtmlBeautify({
    rules: {
      indent: 2,
      blankLines: false
    }
  }),
  posthtmlReplace([
    htmlReplace('link', 'href', `/${config.src}/${config.assets.dir}/`, ''),
    htmlReplace('link', 'href', `/${config.src}/${config.styles.dir}/`, `${config.styles.dir}/`),
    htmlReplace('link', 'href', `/${config.src}/${config.vendor.dir}/`, `${config.vendor.dir}/`),
    htmlReplace('link', 'href', '.styl', '.css'),

    htmlReplace('script', 'src', `/${config.src}/${config.scripts.dir}/`, `${config.scripts.dir}/`),
    htmlReplace('script', 'src', `/${config.src}/${config.vendor.dir}/`, `${config.vendor.dir}/`),

    htmlReplace('img', 'src', `/${config.src}/${config.images.dir}/`, `${config.images.dir}/`),
  ]),
]

const preBuild = (done) => {
  const files = globSync(`${config.src}/${config.components.dir}/**/*.html`, { posix: true })
  const paths = [...files.map(path.dirname), `${config.src}/${config.icons.dir}`]

  folders.splice(0, folders.length, ...paths)

  const htmlCustomData = {
    tags: files.map((file) => {
      const name = path.basename(file, path.extname(file))

      return {
        name: `${TAG_PREFIX}${name}`,
        description: `The [${name}](file:///${path.resolve(file)}) component.`
      }
    })
  }

  fs.writeFileSync('html.html-data.json', JSON.stringify(htmlCustomData, null, 2) + '\n')

  done()
}

const build = () => {
  return src(config.pages.src)
    .pipe(plumber())
    .pipe(posthtml(plugins))
    .pipe(gulpif(production, htmlmin({ collapseWhitespace: true })))
    .pipe(dest(config.pages.dest))
}

export const pages = series(preBuild, build)

export const pagesWatch = (done) => {
  watch(config.pages.watch, pages)

  done()
}
