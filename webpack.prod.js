const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = merge(common, {
  plugins: [new UglifyJSPlugin({ sourceMap: true })],
});

module.exports = config;
