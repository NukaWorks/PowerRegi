import fs from 'fs'
import os from 'os'
import logger from 'electron-log'
import chalk from 'chalk'

const log = logger.scope('ConfigProvider')

let instance = null
const popularDirs = [
  './',
  '../../',
  'dist/',
  'public/'
]

const defaultConfig = {
  'APP_HOST': os.hostname(),
  'APP_WEBUI_PORT': 8080,
  'APP_API_PORT': 8081,
  'APP_DB_URI': 'mongodb://localhost:27017/regi',
}

function fetchConfig() {
  let runningConfig = {}

  for (const dir of popularDirs) {
    if (fs.existsSync(dir + '.env.json')) {
      runningConfig = JSON.parse(fs.readFileSync(dir + '.env.json', 'utf8'))
    }
  }

  for (const key in defaultConfig) {
    if (!runningConfig.hasOwnProperty(key)) {
      log.warn(`ExternalConfig is missing key: ${chalk.white.bold(key)}, using default`)
      runningConfig[key] = defaultConfig[key]
    }
  }

  return runningConfig
}

class ConfigProvider {
  constructor() {
    let currentConfig = fetchConfig()
    if (currentConfig) {
      this.config = currentConfig
      return this.config
    } else {
      throw new Error('No config file found')
    }
  }
}

function getConfig() {
  if (instance === null) {
    instance = new ConfigProvider()
  }

  return instance
}

export default getConfig()
