const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
    publicPath: "",
    library: {
      type: 'var',
      name: 'App'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fullySpecified: false,
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@assets': path.resolve(__dirname, 'public/assets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {  // <-- ВАЖНО: опции внутри массива
                modules: false,
                targets: {
                  browsers: ['last 2 versions', 'not dead', '> 0.2%']
                }
              }]
            ],
            // plugins убираем, так как modules: false уже отключает трансформацию
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|mp3|m4a|ogg|wav|json|ttf|woff2$)$/i,
        type: 'asset/inline'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: 'body'
    }),
  ],
};