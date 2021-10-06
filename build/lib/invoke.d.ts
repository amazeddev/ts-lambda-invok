declare const baseEvent: any;
declare const context: any;
declare function invoke(environment: {
    envs: {
        [key: string]: string;
    };
}, handlerPath: string, eventOptions?: {}): Promise<void>;
