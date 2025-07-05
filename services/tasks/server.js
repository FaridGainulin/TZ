import config from '../config.js'
import liveServer from "live-server"
import chalk from 'chalk';
import qrcode from 'qrcode-terminal';
import os from 'os';

const interfaces = Object.values(os.networkInterfaces() || {}).flat()
const networkIp = interfaces.find((item) => item.address.includes('192.168.0'))?.address

const LOCAL_URL = `http://127.0.0.1:${config.port}`
const NETWORK_URL = networkIp ? `http://${networkIp}:${config.port}` : 'unknown'

export const server = (done) => {
  liveServer.start({
    port: config.port,
    host: "0.0.0.0",
    root: config.dest,
    open: false,
    logLevel: 0
  });

  setTimeout(() => {
    console.log(chalk.blue('Local: ') + chalk.blue.underline(LOCAL_URL));

    if (networkIp) {
      console.log(chalk.gray('Network: ') + chalk.gray.underline(NETWORK_URL))
      qrcode.generate(NETWORK_URL, { small: true });
    }
  })

  done()
}
