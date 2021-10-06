import fs from "fs";
import path from "path";

function readEvent(filePath: string, data: any): any {
    let eventData = {};

    if (filePath) {
        const eventPath = path.resolve(process.cwd(), filePath);
        const rawData = fs.readFileSync(eventPath, "utf8");

        Object.assign(eventData, JSON.parse(rawData));
    }

    if (data) {
        Object.assign(eventData, JSON.parse(data));
    }

    return eventData;
}

module.exports = readEvent;
