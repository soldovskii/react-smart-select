const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DEBUG             = process.env.NODE_ENV !== 'production';

let webpackConfig = {
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'main.js',
		publicPath: '/public/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['react-hot-loader', 'babel-loader'],
				include: path.join(__dirname, 'frontend')
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: DEBUG,
								minimize: !DEBUG
							}
						},
						'postcss-loader',
						'resolve-url-loader',
						'stylus-loader'
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	]
};

if (DEBUG) {
	webpackConfig.entry = [
		'webpack-hot-middleware/client',
		path.join(__dirname, 'frontend', 'index')
	];
	webpackConfig.devtool = 'source-map';
	webpackConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
} else {
	webpackConfig.entry = [
		path.join(__dirname, 'frontend', 'index')
	];
	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	);
}

module.exports = webpackConfig;