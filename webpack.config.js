var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');
var os = require('os');
var fs = require('fs');
var crypto = require('crypto');
var config = require('./config');

var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

var publicPath = '/';
var path = __dirname;
let indexFile = 'index.html';
const isDev = process.env.NODE_ENV === 'dev';

var plugins = [];

plugins.push(new ExtractTextPlugin('[name].[hash:10].css'));
// 提供公共代码
// plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js'));

if (!isDev) {
    path = __dirname + '/build/dist';
    publicPath = '/dist/';
    indexFile = '../index.html';
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            config: JSON.stringify(config),
        },
    })
);


plugins.unshift(
    new HtmlWebpackPlugin({
        title: '门店助手',
        template: './src/Template/index.html',
        filename: indexFile,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
        },
        // chunks: ['app', 'common.js'],
    })
);

// 一个多进程的插件
plugins.push(new HappyPack({
    // loaders is the only required parameter:
    loaders: ['babel'],
    threadPool: happyThreadPool,
    cache: true,
    verbose: true,
    cacheSignatureGenerator: function (filepath) {
        var text = fs.readFileSync(filepath, 'utf-8');
        return crypto.createHash('md5').update(text).digest('hex');
    },
}));
plugins.push(new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].min.js'));
//配置antd-m 1.0.0svg图片
const svgDirs=[
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
]

module.exports = {
    entry: {
        laout: './src/Container/Laout',
        app: ['./src/Container/App'],
        // 第三方库
        vendors: [
            'react',
            'react-router',
            'react-redux',
            'react-dom',
            'redux-thunk',
            'react-fastclick',
        ],
    },
    output: {
        publicPath,
        path,
        filename: '[name].[hash:10].js',
        // 根据路由拆分文件
        chunkFilename: '[name].[chunkhash:5].chunk.js',
    },
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : '',
    module: {
        loaders: [
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader'),
            }, {
                test: /\.less/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader'),
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]',
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url?limit=20000&name=[name].[ext]',
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        ['import', [{ libraryName: 'antd-mobile', style: 'css' }]],
                    ],
                    cacheDirectory: true,
                },
            },
        ],
    },
    plugins,
    resolve: {
        modulesDirectories: ['node_modules',__dirname+'/node_modules'],
        extensions: ['', '.web.js', '.js', '.jsx', 'less'], //后缀名自动补全
        alias: {
            'config': __dirname + '/src/Config',
            'component': __dirname + '/src/Component',
            'src': __dirname + '/src',
            'root': __dirname,
        },
    },
};
