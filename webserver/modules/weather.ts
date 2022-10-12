import createDebug from "debug";
import axios from 'axios';

const debug = createDebug('minidashboard:weather');

interface WeatherApi {
    url: string,
    response: any,
    timeout: number,
    retries: number
}

const ONE_HOUR = 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
const RETRIES = 3;

const _data: WeatherApi = {
    url: '',
    response: null,
    timeout: ONE_HOUR,
    retries: RETRIES
};

const _getData = () => {
    axios.get(_data.url, {
        headers: {
            Accept: 'application/json',
        },
    })
        .then(function (response: any) {
            debug('fetched weather data');
            _data.response = response;
            _data.retries = RETRIES;
        })
        .catch(function (error: any) {
            debug('error' + JSON.stringify(error));
            if (_data.retries > 0) {
                _data.retries--;
                setTimeout(_getData, ONE_MINUTE);
            } else {
                _data.retries = RETRIES;
            }
        });
};

const init = (lat: number, long: number, api: string) => {
    debug('initialized');
    _data.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric&lang=de`;
    _data.response = null;
    // send initially request
    _getData();
    setInterval(_getData, ONE_HOUR); // every hour
};

export const Weather = {
    init,
    getResponse: () => _data.response
}

