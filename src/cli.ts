#!/usr/bin/env node

import yargs from "yargs/yargs";
import path from "path";
import fs from "fs";
import { hideBin } from "yargs/helpers";

const compile = require("./lib/compile.js");
const invoke = require("./lib/invoke.js");
const readEvent = require("./lib/readEvent.js");

yargs(hideBin(process.argv))
    .command(
        "* [lambda]",
        false,
        (command) => {
            return command.positional("lambda", {
                description: "lambda function name",
            });
        },
        async (argv) => {
            const environment = {
                envs: {},
            };

            const envs: { [key: string]: string } = {};

            argv.env &&
                (argv.env as string[]).map((el) => {
                    const [key, value] = el.split("=");
                    envs[key] = value;
                });
            Object.assign(environment.envs, envs);

            const conf_path = argv.config
                ? path.resolve(process.cwd(), argv.config as string)
                : path.resolve(process.cwd(), "./webpack.config.js");

            const event = readEvent(argv.path, argv.data);

            const output = await compile(require(conf_path), argv.lambda);
            await invoke(environment, output, event);
        }
    )
    .options({
        config: {
            alias: "c",
            type: "string",
            description: "webpack config file path",
        },
        path: {
            alias: "p",
            type: "string",
            description: "path to request event data JSON file",
        },
        data: {
            alias: "d",
            type: "string",
            description: "event data in JSON format",
        },
        env: {
            alias: "e",
            type: "array",
        },
    })
    .parse();
