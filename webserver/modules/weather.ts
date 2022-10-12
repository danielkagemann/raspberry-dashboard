import createDebug from "debug";
import axios from 'axios';

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
    axios.get(_data.url, {headers: {
            Accept: 'application/json',
        },})
        .then(function (response: any) {
            debug('fetched weather data');
            _data.response = response;
        })
        .catch(function (error: any) {
            debug('error' + JSON.stringify(error));
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

