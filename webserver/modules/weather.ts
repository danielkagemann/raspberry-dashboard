import http = require("https");
import {ClientRequest} from "http";
import createDebug from "debug";

const debug = createDebug('minidashboard:weather');

interface WeatherApi {
    handle: any,
    url: string,
    response: any
}

const _data: WeatherApi = {
    handle: 0,
    url: '',
    response: null
};

const _getData = () => {
    let result: string = "";
    const req: ClientRequest = http.get(_data.url, (res) => {
        res.on("data", chunk => {
            result += chunk;
        });

        res.on("error", err => {
            debug('resulterror ' + err);
        });

        res.on("end", () => {
            try {
                debug('fetched new data');
                _data.response = JSON.parse(result);
            } catch (err) {
                debug('parsing error ' + err);
            }
        });
    });

    /***
     * handles the errors on the request
     */
    req.on("error", (err) => {
        debug('error sending request' + err);
    });

    /***
     * handles the timeout error
     */
    req.on('timeout', (err: any) => {
        debug('request runs in timeout' + err);
    });

    /***
     * unhandled errors on the request
     */
    req.on('uncaughtException', (err) => {
        debug('request throws uncaught exception' + err);
    });
};

const init = (lat: number, long: number, api: string) => {
    debug('initialized');
    _data.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric&lang=de`;
    _data.response = null;
    // send initially request
    _getData();
    _data.handle = setInterval(_getData, 60 * 60 * 1000); // every hour
};

export const Weather = {
    init,
    getResponse: () => _data.response
}

