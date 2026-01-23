const path = require('path')
const { resolve } = path
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const htmlGlobPlugins = require('./webpack/ejs')
const devServer = require('./webpack/dev-server')
const entries = require('./webpack/entries')

const environment = process.env.NODE_ENV
const environmentConfig = require(`./config/${environment}.js`)
const BASE_ASSETS_DIR = 'assets-recipe-basic'
const OUTPUT_BASE_ASSETS_DIR = 'recipe/basic/assets-recipe-basic'
const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
const imagesRoot = resolve(__dirname, `src/${BASE_ASSETS_DIR}/images`)
const entry = {}

entries.forEach((e) => {
  entry[e.chunk] = resolve(`src/${BASE_ASSETS_DIR}/js/${e.chunk}.ts`)
})

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry,
  output: {
    path: resolve('./htdocs'),
    publicPath: '/',
    filename: `${OUTPUT_BASE_ASSETS_DIR}/js/[name].js`,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      // chunksがasyncだとダイナックimportと呼ばれる非同期のimport方法のみに設定が適用される。
      // import('./app.scss')
      // allは普通のimportとダイナミックを分けずにimportする。
      chunks: 'all',
      // 最低限分割するサイズ
      minSize: 0,
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // reuseExistingChunk: true,
        },
        default: false,
      },
    },
    minimizer: [],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, `src/${BASE_ASSETS_DIR}/js`),
      '@assets': resolve(__dirname, `src/${BASE_ASSETS_DIR}`),
      '@css': resolve(__dirname, `src/${BASE_ASSETS_DIR}/scss`),
      '@images': resolve(__dirname, `src/${BASE_ASSETS_DIR}/images`),
      '@fonts': resolve(__dirname, `src/${BASE_ASSETS_DIR}/fonts`),
      '@swiper': resolve(__dirname, `node_modules/swiper`),
    },
    roots: [resolve(__dirname, 'src')],
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        generator: {
          filename: (pathData) => {
            const resourcePath = pathData.module?.resource
            const relativePath = resourcePath ? path.relative(imagesRoot, resourcePath) : '[name][ext][query]'
            const normalizedPath = relativePath.split(path.sep).join('/')
            return `${OUTPUT_BASE_ASSETS_DIR}/images/${normalizedPath}`
          },
        },
        type: 'asset/resource',
      },
      {
        test: /\.(eot|ttf|woff|otf)$/i,
        generator: {
          filename: `${OUTPUT_BASE_ASSETS_DIR}/fonts/[name][ext][query]`,
        },
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => !url.startsWith('/') && !url.startsWith('http'),
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: (url) => !url.startsWith('/') && !url.startsWith('http'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environmentConfig),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${__dirname}/src/${BASE_ASSETS_DIR}/images`, to: `${OUTPUT_BASE_ASSETS_DIR}/images` },
        { from: `${__dirname}/public`, to: '.' },
      ],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: `${__dirname}/src/${BASE_ASSETS_DIR}/fonts`, to: `${OUTPUT_BASE_ASSETS_DIR}/fonts` }],
    // }),
    new MiniCssExtractPlugin({
      filename: `${OUTPUT_BASE_ASSETS_DIR}/css/[name].css`,
      ignoreOrder: true,
    }),
    ...htmlGlobPlugins(entries, { ...environmentConfig, NODE_ENV: environment }),
  ],
  devServer: devServer,
}

if (isProduction) {
  config.optimization.minimizer.push(new TerserPlugin())
  config.optimization.minimizer.push(new CssMinimizerPlugin())
} else {
  config.devtool = 'source-map'
}

module.exports = config
