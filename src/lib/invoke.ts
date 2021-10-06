const baseEvent = require("./common/apigatewayEvent");
const context = require("./common/context");

async function invoke(
    environment: {
        envs: { [key: string]: string };
    },
    handlerPath: string,
    eventOptions = {}
) {
    for (const [key, value] of Object.entries(environment.envs)) {
        process.env[key] = value;
    }
    const lambda = require(handlerPath);
    const event = {
        ...baseEvent,
        ...eventOptions,
    };

    const response = await lambda.handler(event, context);
    console.log("\n", response);
}

module.exports = invoke;
