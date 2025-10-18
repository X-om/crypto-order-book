import WebSocket from "ws";

export interface ICustomWebSocket extends WebSocket {
    userId?: string;
    email?: string;
}