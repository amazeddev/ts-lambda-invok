"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readEvent(filePath, data) {
    let eventData = {};
    if (filePath) {
        const eventPath = path_1.default.resolve(process.cwd(), filePath);
        const rawData = fs_1.default.readFileSync(eventPath, "utf8");
        Object.assign(eventData, JSON.parse(rawData));
    }
    if (data) {
        Object.assign(eventData, JSON.parse(data));
    }
    return eventData;
}
module.exports = readEvent;
//# sourceMappingURL=readEvent.js.map