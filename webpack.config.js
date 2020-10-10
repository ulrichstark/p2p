const path = require("path");

module.exports = {
    mode: "development",
    watch: true,
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    target: 'node',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
        ],
    },
};
