import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import {WebSocket, WebSocketServer} from 'ws';
import {DailyItem, InitializeDailyEvents} from "./dailyEvents";

const PORT: number = 8080;
const wss = new WebSocketServer({port: PORT+2});
let socket: WebSocket | null = null;

/**
 * handle new connection (last one wins)
 * at the moment only one connection is supported
 */
wss.on('connection', (ws: WebSocket) => {
    console.log('[websocket]: connection established')
    socket = ws;
});

const app = express();

// the application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const _sendMessage = (obj: any) => {
    if (socket) {
        socket.send(JSON.stringify(obj));
    } else {
        console.log('[websocket] socket not available', obj.message);
    }
};

/**
 * request POST /v1/messagae
 */
app.post('/v1/message', (req: any, res: any) => {
    _sendMessage(req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    const events: DailyItem[] = [
        {hour: 8, minute: 30, text: 'Kaffeepause ☕'},
        {hour: 12, minute: 0, text: 'Mahlzeit 🍲'},
        {hour: 13, minute: 30, text: 'Kaffeepause ☕'},
        {hour: 15, minute: 0, text: 'Feierabend 🍺'},
    ];
    InitializeDailyEvents(events, (text:string) => _sendMessage({type:'dark', message:text}));
    console.log(`️[server]: Server is running at http://localhost:${PORT}`);
});
