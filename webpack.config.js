const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

var templateConfig = require('./config/production');
try {
  // Overwrite production with local config values where present
  var localTemplateConfig = require('./config/local');
  templateConfig = Object.assign(templateConfig, localTemplateConfig);
} catch (ex) {}

module.exports = {
  entry: {
    main: './ui_src/main.jsx'
  },
  externals: {
    react: "React"
  },
  output: {
    filename: './hosted/js/[name].js'
  },
  module: {
    loaders: [
      // Style
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract([ 'css?-minimize', 'sass' ]) },

      // This may need some atention when js files are being included from node_modules
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: [ 'es2015' ] } },

      // React specific javascript
      { test: /\.jsx?/, loader: 'babel', query: { presets:[ 'react', 'es2015' ] } },

      // HTML Files
      { test: /\.html$/, loader: 'html' }
    ]
  },
  // resolve: {
  //   alias: {}
  // },
  plugins: [
    // First destroy the existing dist folder
    new CleanWebpackPlugin(['hosted']),

    // Compress JS files
    new webpack.optimize.UglifyJsPlugin(),

    // Set export path for generated style sheets
    new ExtractTextPlugin('./hosted/style/[name].css'),

    // Build HTML
    new HtmlWebpackPlugin(Object.assign(
      { filename: './hosted/index.html', template: './ui_src/templates/index.ejs' },
      templateConfig
    ))
    ,

    // Copy static assets over
    new CopyWebpackPlugin([
      { from: 'assets', to: 'hosted/assets/' }
    ])
  ],
  sassLoader: {
    includePaths: [],
    outputStyle: 'expanded'
  }
};
