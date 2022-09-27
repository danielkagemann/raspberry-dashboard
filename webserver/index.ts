import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import {WebSocket, WebSocketServer} from 'ws';

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

/**
 * request POST /v1/messagae
 */
app.post('/v1/message', (req: any, res: any) => {
    if (socket) {
        socket.send(JSON.stringify(req.body));
    } else {
        console.log('[websocket] socket not available');
    }

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`️[server]: Server is running at http://localhost:${PORT}`);
});
