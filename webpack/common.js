const { resolve } = require('path');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../src'),
  watchOptions: {
      poll: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'cache-loader'
        }, {
            loader: 'happypack/loader?id=babel'
        }],
        include: /src/,
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
            configFile: resolve(__dirname, '../tslint.json'),
            tsConfigFile: resolve(__dirname, '../tsconfig.json')
        }
      },
      {
        test: /\.tsx?$/,
        use: [{
            loader: 'cache-loader'
        }, {
            loader: 'happypack/loader?id=ts'
        }],
        exclude: /node_modules/,
      },
      {
         test: /\.(eot|ttf|woff|woff2)$/,
         use: [{
             loader: `file-loader?name=fonts/[name].[ext]`
         }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new HappyPack({
        id: 'babel',
        threads: 2,
        verbose: false,
        loaders: [{
            path: 'babel-loader',
            query: {
                presets: [
                    'env',
                    'react'
                ]
            }
        }]
    }),
    new HappyPack({
        id: 'ts',
        threads: 2,
        verbose: false,
        loaders: [{
            path: 'ts-loader',
            query: {
                happyPackMode: true,
                configFile: resolve(__dirname, '../tsconfig.json')
            }
        }]
    }),
    new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tsconfig: resolve(__dirname, '../tsconfig.json')
    }),
    new HtmlWebpackPlugin({ title: 'Insurance Project' , template: 'index.html' }),
  ],
  performance: {
    hints: false,
  },
};
