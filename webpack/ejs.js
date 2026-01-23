const HtmlWebpackPlugin = require('html-webpack-plugin')
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader')
const OUTPUT_BASE_ASSETS_DIR = 'recipe/basic/'

module.exports = (entries, templateEnv = {}) => {
  return entries.map((entry) => {
    return new HtmlWebpackPlugin({
      //出力ファイル名
      filename: `${OUTPUT_BASE_ASSETS_DIR}${entry.path}.html`,
      chunks: ['common', entry.chunk],
      //ejsファイルの読み込み
      template: htmlWebpackPluginTemplateCustomizer({
        htmlLoaderOption: {
          //ファイル自動読み込みと圧縮を無効化
          sources: false,
          minimize: false,
        },
        templateEjsLoaderOption: {
          data: {
            process: {
              env: templateEnv,
            },
          },
        },
        templatePath: `./src/ejs/${entry.path}.ejs`,
      }),

      //JS・CSS自動出力と圧縮を無効化
      inject: 'body',
      minify: false,
    })
  })
}
