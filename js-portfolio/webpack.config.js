
const path = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const CopyPlugin = require ('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */

module.exports = {
    mode: 'production', // LE INDICO EL MODO EXPLICITAMENTE
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'public_html/js'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js'
        // EL NOMBRE DEL ARCHIVO FINAL,
    },
    resolve: {
        extensions: ['.js'],
        alias:{
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@templates': path.resolve(__dirname, 'src/templates'),
          '@styles': path.resolve(__dirname, 'src/styles'),
          '@images': path.resolve(__dirname, 'src/assets/images'),

        } // LOS ARCHIVOS QUE WEBPACK VA A LEER
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                  'css-loader'
                ],
              },
              
              {
                  test: /\.png/,
                  type: 'asset/resource'
              }
            ]
          },
          plugins: [
            new HtmlWebpackPlugin({
              inject: true,
              template: './public/index.html',
              filename: './index.html'
            }),
            new MiniCssExtractPlugin(
                {
                    filename: 'assets/[name].[contenthash].css'
                }
            ),

            new Dotenv(),

            new CleanWebpackPlugin(),


            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "assets/images"),
                        to: "assets/images"
                    }
                ]
            })
          ],

      optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
}