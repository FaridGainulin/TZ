import config from '../config.js'
import { deleteSync } from 'del'

export const clean = (done) => {
  deleteSync([config.dest])

  done()
}
