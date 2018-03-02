const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = merge(common, {
  devServer: {
    historyApiFallback: true,
  },
});

module.exports = config;
