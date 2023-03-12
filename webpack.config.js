const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 建置模式 (預設為 production)
    mode: "development",
    // 入口
    entry: "./src/Index.js",
    // 輸出
    output: {
        filename: "Bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    // devServer設定
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    // 模組載入規則
    module: {
        rules: [
            // CSS 樣式表載入規則
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // SCSS SASS 樣式表載入規則
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./dist/index.html",
            filename: "./index.html",
            favicon: "./src/Assets/R.png",
        }),
    ],
};
