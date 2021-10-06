import webpack, { Configuration } from "webpack";
import path from "path";

async function compile(config: Configuration, target: string) {
    config.mode = "none";
    config.plugins = [];
    // replace with your own desired entry
    const entry_path = (config.entry as { [key: string]: string })[target];
    config.entry = {};
    config.entry[target] = entry_path;

    const compiler = webpack(config);

    const output = path.resolve(
        (config.output as { [key: string]: string }).path,
        (config.output as { [key: string]: string }).filename.replace(
            "[name]",
            target
        )
    );

    return new Promise((resolve, reject) => {
        compiler.run((err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(output);
        });
    });
}

module.exports = compile;
