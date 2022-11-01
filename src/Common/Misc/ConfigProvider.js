import fs from 'fs'

let instance = null
const popularDirs = [
  './',
  '../../',
  'dist/'
]

function fetchConfig() {
  for (const dir of popularDirs) {
    if (fs.existsSync(dir + '.env.json')) {
      return JSON.parse(fs.readFileSync(dir + '.env.json', 'utf8'))
    }
  }
}

class ConfigProvider {
  constructor() {
    if (fetchConfig()) {
      this.config = fetchConfig()
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

const config = getConfig()
export default config
