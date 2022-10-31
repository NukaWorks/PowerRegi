////////////////////////////////
//
// PowerRegi WebUi Server
//
////////////////////////////////

const { preview } = require('vite')
require('dotenv').config()

async function startServer() {
  const previewServer = await preview({
    // any valid user config options, plus `mode` and `configFile`
    preview: {
      port: process.env.APP_WEBUI_PORT,
      open: false,
    }
  })

  previewServer.printUrls()
}

startServer()
    .then(() => {
      console.log(`WebUi is started at port ${process.env.APP_WEBUI_PORT}`)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })