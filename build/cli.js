#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("yargs/helpers");
const compile = require("./lib/compile.js");
const invoke = require("./lib/invoke.js");
const readEvent = require("./lib/readEvent.js");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("* [lambda]", false, (command) => {
    return command.positional("lambda", {
        description: "lambda function name",
    });
}, (argv) => __awaiter(void 0, void 0, void 0, function* () {
    const environment = {
        envs: {},
    };
    const envs = {};
    console.log(argv.env);
    argv.env &&
        argv.env.map((el) => {
            const [key, value] = el.split("=");
            envs[key] = value;
        });
    Object.assign(environment.envs, envs);
    const conf_path = argv.config
        ? path_1.default.resolve(process.cwd(), argv.config)
        : path_1.default.resolve(process.cwd(), "./webpack.config.js");
    const event = readEvent(argv.path, argv.data);
    const output = yield compile(require(conf_path), argv.lambda);
    yield invoke(environment, output, event);
}))
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
//# sourceMappingURL=cli.js.map