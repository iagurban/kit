const { WebpackPnpExternals } = require('webpack-pnp-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (options, webpack) {

    // console.log(options);

    return {
        ...options,
        entry: ['webpack/hot/poll?100', options.entry],
        externals: [
            WebpackPnpExternals({ exclude: ['webpack/hot/poll?100'] }),
        ],
        plugins: [
            ...options.plugins.slice(0, -1),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    typescriptPath: "tsconfig.build.ts",
                    extensions: {pnp: true}
                }
            }),

            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/],
            }),
            new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
        ],
    };
};
