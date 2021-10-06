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
const baseEvent = require("./common/apigatewayEvent");
const context = require("./common/context");
function invoke(environment, handlerPath, eventOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [key, value] of Object.entries(environment.envs)) {
            process.env[key] = value;
        }
        const lambda = require(handlerPath);
        const event = Object.assign(Object.assign({}, baseEvent), eventOptions);
        const response = yield lambda.handler(event, context);
        console.log("\n", response);
    });
}
module.exports = invoke;
//# sourceMappingURL=invoke.js.map