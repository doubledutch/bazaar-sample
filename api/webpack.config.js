const path = require('path')
const webpack = require('webpack')

var fs = require('fs')
var entries = {}
fs.readdirSync('./').filter(function (file) {
  return file.match(/.*\.js$/) && !file.match(/webpack/)
}).forEach(function (f) {
  entries[f.replace('.js', '')] = './' + f
})

module.exports = {
  entry: entries,
  output: {
    path: __dirname, filename: './build/[name].js',
    libraryTarget: 'var',
    // `library` determines the name of the global variable
    library: 'run'
  },
  devServer: {
    contentBase: path.join(__dirname, 'static')
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        // exclude node_modules except ES6 modules:   #TODO: use include for whitelist.
        exclude: /node_modules\/(?!(react-native-|apsl-react-native|bazaar-client)).*/,
        include: [
          path.resolve(__dirname, '../')
        ],
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          babelrc: false,
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      beautify: true
    })
  ]
}
