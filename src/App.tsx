import React, {useEffect, useRef, useState} from 'react';
import {VideoEmbedded, VideoEmbeddedType} from "./video-embedded/VideoEmbedded";
import {AlertScreen, AlertType} from "./alert-screen/AlertScreen";

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
const ALERTDURATION = 10000;

function App() {
    const [alert, setAlert] = useState<AlertType | null>(null)
    const [front, setFront] = useState<boolean>(true)

    /**
     * switch between front and back
     */
    useEffect(() => {
        setTimeout(() => setFront(!front), DURATION);
    }, [front]);


    /**
     * for websocket installation
     */
    useEffect(() => {
        try {
            // handle websocket
            const ws = new WebSocket('ws://localhost:8080');

            ws.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);

                setAlert({type: data.type, message: data.text});
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

    if (alert !== null) {
        return <AlertScreen type={alert.type} message={alert.message}/>
    }

    return (
        <div className="row">
            {
                (front ? listFront : listBack).map(drawVideo)
            }

        </div>
    );
}

export default App;
