export interface IRedisConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
    maxRetriesPerRequest?: number;
    reconnectOnError?: (err: Error) => boolean;
}