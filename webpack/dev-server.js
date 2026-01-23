const { resolve, join } = require('path')
const fs = require('fs')
let ASSETS_DIR = '/recipe/basic/assets'

if (process.env.NODE_ENV === 'production') {
  ASSETS_DIR = 'https://s3-11.park.ajinomoto.co.jp/assets'
}

module.exports = {
  hot: false,
  liveReload: true,
  port: 9000,
  static: {
    directory: resolve(__dirname, './'),
  },
  onBeforeSetupMiddleware: function (devServer) {
    const existsSync = (res, fileName, next, contentType) => {
      if (fs.existsSync(fileName)) {
        fs.readFile(fileName, (err, fileContents) => {
          if (err && err.code === 'ENOENT') {
            res.status(404).end()
            return
          }

          if (contentType) {
            res.contentType('image/svg+xml')
          }

          res.end(fileContents)
        })
      } else {
        next()
      }
    }

    devServer.app.get('*.png|*.jpg|*.gif|*.js|*.css|*.ttf|*.woff|*.otf|*.xml|*.html', (req, res, next) => {
      const regexp = new RegExp(`${ASSETS_DIR}/images/(.+$)`)
      const result = regexp.test(req.originalUrl)
      if (result) {
        const fileName = req.originalUrl.replace(`${ASSETS_DIR}/images`, 'assets2/images')
        const filePath = join(__dirname, '../src/', fileName)
        existsSync(res, filePath, next)
      } else {
        next()
      }
    })

    devServer.app.get('*.svg', (req, res, next) => {
      const regexp = new RegExp(`${ASSETS_DIR}/images/(.+$)`)
      const result = regexp.test(req.originalUrl)
      if (result) {
        const fileName = req.originalUrl.replace(`${ASSETS_DIR}/images`, 'assets2/images')
        const filePath = join(__dirname, '../src/', fileName)
        existsSync(res, filePath, next, 'image/svg+xml')
      } else {
        next()
      }
    })
  },
}
