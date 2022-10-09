import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import {WebSocket, WebSocketServer} from 'ws';
import {DailyEvents, DailyItem} from "./modules/dailyEvents";
import {Weather} from "./modules/weather";
import createDebug from "debug";
const debug = createDebug('minidashboard:server');

const PORT: number = 8080;
const wss = new WebSocketServer({port: PORT+2});
let socket: WebSocket | null = null;

/**
 * handle new connection (last one wins)
 * at the moment only one connection is supported
 */
wss.on('connection', (ws: WebSocket) => {
    debug('websocket connection established');
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
        debug('no websocket client: ' + obj.message)
    }
};

/**
 * request POST /v1/messagae
 */
app.post('/v1/message', (req: any, res: any) => {
    _sendMessage(req.body);
    res.sendStatus(200);
});

app.get('/v1/weather', (req:any, res:any) => {
    const payload = Weather.getResponse();
    if (payload) {
        res.json(Weather.getResponse())
    } else {
        res.sendStatus(406);
    }
});

app.listen(PORT, () => {
    const events: DailyItem[] = [
        {hour: 8, minute: 30, text: 'Kaffeepause ☕'},
        {hour: 12, minute: 0, text: 'Mahlzeit 🍲'},
        {hour: 13, minute: 30, text: 'Kaffeepause ☕'},
        {hour: 15, minute: 0, text: 'Feierabend 🍺'},
    ];
    DailyEvents.init(events, (text:string) => _sendMessage({type:'dark', message:text}));
    Weather.init(48.7979966,8.6201857, '9b9de88aeecc02be1f016ad42d667ecf');
    debug(`server is running at http://localhost:${PORT}`);
});
