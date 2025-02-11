export declare class BCI2K_OperatorConnection {
    msgID: number;
    websocket: any;
    state: any;
    ondisconnect: any;
    onStateChange: any;
    address: string;
    latestIncomingData: string;
    newData: any;
    responseBuffer: any;
    constructor(address?: string);
    connect(address?: string): Promise<void>;
    disconnect(): void;
    connected(): boolean;
    execute(instruction: string): Promise<string>;
    getVersion(): Promise<string>;
    showWindow(): Promise<void>;
    hideWindow(): Promise<void>;
    startExecutable(executable: string): Promise<void>;
    startDummyRun(): Promise<void>;
    setWatch(state: string, ip: string, port: string): Promise<void>;
    resetSystem(): Promise<void>;
    setConfig(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    kill(): Promise<void>;
    stateListen(): void;
    getSubjectName(): Promise<string>;
    getTaskName(): Promise<string>;
    setParameter(parameter: any): Promise<void>;
    setState(state: any): Promise<void>;
    getParameters(): Promise<any>;
}
//# sourceMappingURL=BCI2K_OperatorConnection.d.ts.map