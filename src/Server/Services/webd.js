////////////////////////////////
//
// PowerRegi WebUi Server
//
////////////////////////////////

import { preview } from 'vite'
import env from '../../Common/Misc/ConfigProvider'

async function startServer() {
  const previewServer = await preview({
    // any valid user config options, plus `mode` and `configFile`
    preview: {
      port: env.APP_WEBUI_PORT,
      open: false,
    }
  })

  previewServer.printUrls()
}

function start() {
  startServer()
      .then(() => {
        console.log(`WebUi is started at port ${'env.APP_WEBUI_PORT'}`)
        return 0
      })
      .catch(err => {
        console.error(err)
        return 1
      })

  return 0
}

function stop() {
  return 0
}
