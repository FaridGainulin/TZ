import { src, dest } from 'gulp'
import gulpZip from 'gulp-zip'
import { deleteSync } from 'del'
import config from '../config.js'

export const zip = () => {
  deleteSync([config.build])

  const currentDate = new Date()

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const filename = `dest(${day}-${month}-${year}_${hours}-${minutes}).zip`;

  return src(`${config.dest}/**/*.*`)
    .pipe(gulpZip(filename))
    .pipe(dest(config.build))
    .pipe(dest(config.history))
}
