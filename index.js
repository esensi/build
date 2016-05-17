// base for this file, taken from: http://julienrenaux.fr/2015/03/30/introduction-to-webpack-with-practical-examples/
var path = require('path'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");
 
var extractCSS = new ExtractTextPlugin('css/[name].css');

// esensi/build
module.exports = {
    debug: true,
    entry: {
        public: './public',
        admin: './admin'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
        	// babel loader (es6 to es5)
			{
				test: /\.es6$/,
				loader: 'babel-loader',
        		exclude: /node_modules/,
				query: {
					presets: ['es2015'],
      				plugins: ['transform-runtime'] // had to use this plugin, otherwise was getting error with runtime (took from: https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code)
				}
			},

			// css loader
			{
				test: /\.css$/,
				loader: extractCSS.extract(['css', 'autoprefixer'])
				// loaders: ['style', 'css', 'autoprefixer']
			},

			// sass loader
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css', 'sass'])
				// loaders: ['style', 'css', 'sass']
			},

			// less loader
			{
  				test: /\.less$/,
				loader: extractCSS.extract(['css', 'less'])
				// loaders: ['style', 'css', 'less']
			},

			// images
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader?limit=5000&name=img/img-[hash:6].[ext]"
			}
        ]
    },
    plugins: [
        extractCSS
    ]
};