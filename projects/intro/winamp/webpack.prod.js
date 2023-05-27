const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
});
