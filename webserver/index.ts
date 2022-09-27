import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import {WebSocket, WebSocketServer} from 'ws';

const PORT: number = 8080;
const wss = new WebSocketServer({port: PORT+2});
let socket: WebSocket | null = null;

// TODO handle multiple connections?
wss.on('connection', (ws: WebSocket) => {
    console.log('[websocket]: connection established')
    socket = ws;
});

const app = express();

// the application
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/v1/message', (req: any, res: any) => {
    console.log(req.body);

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
