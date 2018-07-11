var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname,'..',dir);
}

var webapckConfig = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: [resolve('src',resolve('test'))]
			},
			{
				test: /\.(js)$/,
				exclude: /src|packages/,
				enforce: 'post',
				use: [{
					loader: 'istanbul-instrumenter-loader',
					options: {
						esModules: true
					}
				}]
			},
			{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader',
					options: {
						preLoaders: {
							js: 'istanbul-instrumenter-loader?esModules=true'
						}
					}
				}]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'vue-style-loader'
				})
			},
			{
				test: /\.(png|gif|jpe?g)(\?\S*)?$/,
				use: [{
					loader: 'url-loader'
				}]
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
				use: [{
					loader: 'url-loader'
				}]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
}
module.exports = webapckConfig;