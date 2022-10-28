import React, {useEffect, useRef, useState} from 'react';
import {VideoEmbedded, VideoEmbeddedType} from "./components/video-embedded/VideoEmbedded";
import {AlertScreen, AlertType} from "./components/alert-screen/AlertScreen";
import {isPortrait} from "./Helper";
import {WeatherScreen} from "./components/weather-screen/WeatherScreen";
import {Opening} from "./components/opening/Opening";
import {Countdown} from "./components/countdown/Countdown";

/*
maybe some interesting locations
    videoId: 'M2ojptpkIPo', overlay: 'HAM BU RG'
    videoId: 'frTb6m12Xtw',overlay: 'SAR AJE VO'
    videoId: 'SZp1Q6LX7Wk', overlay: 'CUX HAV EN'
 */

const list: Array<VideoEmbeddedType> = [
    {
        videoId: 'C6Fp75xQBfc',
        overlay: 'NO RD EN'
    },
    {
        videoId: 'Td8mpOYNh4M',
        overlay: 'PU LA'
    }
];

const CONFIGURATION = {
    showAlert: 8,
    showWeather: 10,
    showVideo: 90
};

function App() {
    const [alert, setAlert] = useState<AlertType | null>(null)
    const [showWeather, setShowWeather] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);

    /**
     * switch between front and back
     */
    useEffect(() => {
        setTimeout(() => {
            let next = seconds + 1;

            if (next === CONFIGURATION.showVideo) {
                setShowWeather(true);
                setTimeout(() => {
                    setShowWeather(false);
                    setSeconds(0);
                }, CONFIGURATION.showWeather * 1000);
            } else {
                setSeconds(next);
            }
        }, 1000);
    }, [seconds]);


    /**
     * for websocket installation
     */
    useEffect(() => {
        try {
            // handle websocket
            const ws = new WebSocket('ws://localhost:8082');
            ws.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                setAlert({...data});
                setTimeout(() => setAlert(null), CONFIGURATION.showAlert);
            };
            ws.onerror = (error: Event) => {
                console.log(error);
            };
        } catch (e) {
            console.log(e);
        }
    }, []);

    /**
     * draw the video
     * @param item
     * @param index
     */
    const drawVideo = (item: VideoEmbeddedType, index: number) => (
        <div className="row--element" key={`video-${index}`}>
            <VideoEmbedded videoId={item.videoId}
                           overlay={item.overlay}/>
        </div>
    );

    return (
        <Opening>
            <>
                <div className={`container ${isPortrait() ? 'portrait' : ''}`}>
                    <div className={`row ${isPortrait() ? 'portrait--sizes' : ''}`}>
                        {
                            list.map(drawVideo)
                        }
                    </div>
                </div>
                {showWeather && <WeatherScreen/>}
                {alert && <AlertScreen type={alert.type} message={alert.message}/>}
            </>
            <Countdown seconds={seconds} total={CONFIGURATION.showVideo}/>
        </Opening>
    );
}

export default App;
