import Fontmin from 'fontmin'
import string from 'lodash/string.js'
import { globSync } from 'glob'
import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars';
import config from './config.js'

const generateCssFile = () => {
  const files = globSync(`${config.src}/${config.fonts.dir}/*.woff`, { posix: true })

  const fonts = files.map((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const fontName = path.basename(filePath, ext);

    return {
      fontName: string.kebabCase(fontName),
      originName: fontName,
    }
  })

  fs.readFile('services/templates/fonts.hbs', 'utf-8', (err, templateSource) => {
    const template = Handlebars.compile(templateSource);
    const content = template({ fonts });

    fs.writeFile(`${config.src}/${config.styles.dir}/_fonts.styl`, content, (err) => {
      if (err) {
        console.error('Error writing Stylus file:', err);
      } else {
        console.log('Stylus file generated successfully!');
      }
    });
  });
}

new Fontmin()
  .src(`${config.src}/${config.fonts.dir}/*.ttf`)
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2woff2())
  .dest(`${config.src}/${config.fonts.dir}`)
  .run(generateCssFile);
