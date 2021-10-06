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
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
function compile(config, target) {
    return __awaiter(this, void 0, void 0, function* () {
        config.mode = "none";
        config.plugins = [];
        // replace with your own desired entry
        const entry_path = config.entry[target];
        config.entry = {};
        config.entry[target] = entry_path;
        const compiler = (0, webpack_1.default)(config);
        const output = path_1.default.resolve(config.output.path, config.output.filename.replace("[name]", target));
        return new Promise((resolve, reject) => {
            compiler.run((err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(output);
            });
        });
    });
}
module.exports = compile;
//# sourceMappingURL=compile.js.map