const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('shelljs/global')
var ora = require('ora')
var webpack = require('webpack')

var spinner = ora('building for production...')
spinner.start()

const webpackConfig = {
  entry: './lib/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'easy-slack',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ["transform-es2015-modules-commonjs"]
          },
        },
      },
    ],
  },
};

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
