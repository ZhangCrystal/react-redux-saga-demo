const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const Clean = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, "app"),
    build: path.join(__dirname, "dist")
};

const commonConfig = {
    entry: PATHS.app,
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: PATHS.build,
        filename: "[name].js"
    },
    performance: { hints: false },
    module: {
        rules: [
            {  test:/\.js$/,
                exclude:/(node_modules)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:require('html-webpack-template') ,
            title: "app",
            inject: false,
            appMountId:'app'
        })
    ]
};

const developmentConfig = {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,

        // display only errors to reduce the amount of output
        stats: "errors-only",

        // parse host and port from env so this is easy
        // to customize
        // host: process.env.HOST,
        // port: process.env.PORT
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

const productionConfig = {
    mode: 'production',
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: "[name].[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        rules: [
            // Extract CSS during build
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new Clean(),
        // Output extracted CSS to a file
        new ExtractTextPlugin("styles.[contenthash].css"),
        // Extract vendor and manifest files
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor",
        //     minChunks: ({ resource }) =>
        //         resource &&
        //         resource.indexOf("node_modules") >= 0 &&
        //         resource.match(/\.js$/)
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "manifest"
        // }),
        // Setting DefinePlugin affects React library size!
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = env => {
    process.env.BABEL_ENV = env;

    if (env === "development") {
        return merge(commonConfig, developmentConfig);
    }

    return merge(commonConfig, productionConfig);
};
