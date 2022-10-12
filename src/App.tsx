import React, {useEffect, useRef, useState} from 'react';
import {VideoEmbedded, VideoEmbeddedType} from "./components/video-embedded/VideoEmbedded";
import {AlertScreen, AlertType} from "./components/alert-screen/AlertScreen";
import {isPortrait} from "./Helper";
import {WeatherScreen} from "./components/weather-screen/WeatherScreen";


const listFront: Array<VideoEmbeddedType> = [
    {
        videoId: 'M2ojptpkIPo',
        overlay: 'HAM BU RG'
    },
    {
        videoId: 'nxlQHQxVFis',
        overlay: 'PU LA'
    }];

const listBack: Array<VideoEmbeddedType> = [
    {
        videoId: 'frTb6m12Xtw',
        overlay: 'SAR AJE VO'
    },
    {
        videoId: 'SZp1Q6LX7Wk',
        overlay: 'CUX HAV EN'
    }
];

const DURATION = 90000;
const ALERTDURATION = 8000;
const WEATHERDURATION = 8000;

const OPEN = {from: 8, to: 20};

function App() {
    const [alert, setAlert] = useState<AlertType | null>(null)
    const [showWeather, setShowWeather] = useState<boolean>(false);
    const [front, setFront] = useState<boolean>(true)

    const hour =  useRef(new Date().getHours());

    /**
     * switch between front and back
     */
    useEffect(() => {
        setTimeout(() => {
            setFront(!front);
            setShowWeather(true);

            // just show for 5s
            setTimeout(() => setShowWeather(false), WEATHERDURATION);

        }, DURATION);

        hour.current = new Date().getHours();
    }, [front]);

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
                setTimeout(() => setAlert(null), ALERTDURATION);
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
        <div className="row--element" key={`video-${front ? 'front' : 'back'}-${index}`}>
            <VideoEmbedded videoId={item.videoId}
                           overlay={item.overlay}/>
        </div>
    );

    // check opening time
    if (hour.current < OPEN.from || hour.current > OPEN.to) {
        return (<AlertScreen type={'dark'} message={'Geschlossen'} />);
    }

    return (
        <>
            <div className={`container ${isPortrait() ? 'portrait' : ''}`}>
                <div className={`row ${isPortrait() ? 'portrait--sizes' : ''}`}>
                    {
                        (front ? listFront : listBack).map(drawVideo)
                    }
                </div>
            </div>
            {showWeather && <WeatherScreen />}
            {alert && <AlertScreen type={alert.type} message={alert.message}/>}
        </>
    );
}

export default App;
