import React, {useEffect, useState} from "react";
import {isPortrait} from "../../Helper";

export const WeatherScreen = () => {
    const [weather, setWeather] = useState<any>(null);
    useEffect(() => {
        fetch('/v1/weather').then(res => res.json()).then(setWeather).catch(err => {
            setWeather({main: {temp: '0'}, weather: [{id: 711, description: '---'}]})
        });
    }, []);

    const drawIcon = () => {
        if (!weather) {
            return null;
        }
        const mapping: { [key: string]: string } = {
            "200": "storm-showers",
            "201": "storm-showers",
            "202": "storm-showers",
            "210": "storm-showers",
            "211": "thunderstorm",
            "212": "thunderstorm",
            "221": "thunderstorm",
            "230": "storm-showers",
            "231": "storm-showers",
            "232": "storm-showers",
            "300": "sprinkle",
            "301": "sprinkle",
            "302": "sprinkle",
            "310": "sprinkle",
            "311": "sprinkle",
            "312": "sprinkle",
            "313": "sprinkle",
            "314": "sprinkle",
            "321": "sprinkle",
            "500": "rain",
            "501": "rain",
            "502": "rain",
            "503": "rain",
            "504": "rain",
            "511": "rain-mix",
            "520": "showers",
            "521": "showers",
            "522": "showers",
            "531": "showers",
            "600": "snow",
            "601": "snow",
            "602": "snow",
            "611": "sleet",
            "612": "sleet",
            "615": "rain-mix",
            "616": "rain-mix",
            "620": "rain-mix",
            "621": "rain-mix",
            "622": "rain-mix",
            "701": "sprinkle",
            "711": "smoke",
            "721": "day-haze",
            "731": "cloudy-gusts",
            "741": "fog",
            "751": "cloudy-gusts",
            "761": "dust",
            "762": "smog",
            "771": "day-windy",
            "781": "tornado",
            "800": "sunny",
            "801": "cloudy",
            "802": "cloudy",
            "803": "cloudy",
            "804": "cloudy",
            "900": "tornado",
            "901": "hurricane",
            "902": "hurricane",
            "903": "snowflake-cold",
            "904": "hot",
            "905": "windy",
            "906": "hail",
            "951": "sunny",
            "952": "cloudy-gusts",
            "953": "cloudy-gusts",
            "954": "cloudy-gusts",
            "955": "cloudy-gusts",
            "956": "cloudy-gusts",
            "957": "cloudy-gusts",
            "958": "cloudy-gusts",
            "959": "cloudy-gusts",
            "960": "thunderstorm",
            "961": "thunderstorm",
            "962": "cloudy-gusts",
        };
        const code = weather.weather[0].id;
        let icon = mapping[code];
        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        // Finally tack on the prefix.
        icon = 'wi wi-' + icon;


        return (<span className={icon}/>);
    };

    const drawDate = () => {
        const now = new Date();
        const month = 'Januar Februar März April Mai Juni Juli August September Oktober November Dezember'
            .split(' ');

        return `${now.getDate()}. ${month[now.getMonth()]}`;
    }

    return (
        <div className={`weather ${isPortrait() ? 'flip' : ''}`}>

            <div className="weather--right">
                <div>
                    <div className="weather--time">
                        {new Date().toLocaleTimeString().substring(0, 5)}
                    </div>
                    <div className="weather--date">
                        {drawDate()}
                    </div>
                </div>
                <div>
                    <div className="weather--temp">{drawIcon()} {weather?.main?.temp ?? 'temp'}&#8451;</div>
                    <div className="weather--desc">{weather?.weather[0].description ?? 'desc'}</div>
                </div>
            </div>
        </div>
    );
};
