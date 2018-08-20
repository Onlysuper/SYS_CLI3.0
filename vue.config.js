var path = require('path')
// var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 使用 webpack
var webpack = require('webpack')
// var configureWebpack = require('configureWebpack');
// var MyAwesomeWebpackPlugin = require('MyAwesomeWebpackPlugin');
console.log(process.env.NODE_ENV);
var assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest'
    ? "static"
    : "static"
  return path.posix.join(assetsSubDirectory, _path)
}
module.exports = {
  assetsDir: "static",
  //修改全局路径
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@src', resolve('src'))
      .set('@node_modules', resolve('node_modules'))
  },
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    // sourceMap: false,
    // css预设器配置项
    // loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json']
    },
    output: {
      filename: assetsPath('js/[name].file.[hash:6].js'),
      chunkFilename: assetsPath('js/[name].chunk.[hash:6].js')
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
        'jWeixin': 'weixin-js-sdk',
        'pubsub': 'pubsub-js'
      }),

    ]

  }
}