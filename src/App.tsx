import React, {useEffect, useRef, useState} from 'react';
import {VideoEmbedded, VideoEmbeddedType} from "./video-embedded/VideoEmbedded";
import {AlertScreen, AlertType} from "./alert-screen/AlertScreen";

const list: Array<VideoEmbeddedType> = [
    {
        videoId: 'M2ojptpkIPo',
        overlay: 'HAM BU RG'
    },
    {
        videoId: 'nxlQHQxVFis',
        overlay: 'PU LA'
    },
    {
        videoId: 'frTb6m12Xtw',
        overlay: 'SAR AJE VO'
    },
    {
        videoId: 'SZp1Q6LX7Wk',
        overlay: 'CUX HAV EN'
    }
];

function App() {

    const [alert, setAlert] = useState<AlertType | null>(null)

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
                setTimeout(() => setAlert(null), 10000);
            };

            ws.onerror = (error: Event) => {
                console.log(error);
            };
        } catch (e) {
            console.log(e);
        }


    }, []);

    if (alert !== null) {
        return <AlertScreen type={alert.type} message={alert.message}/>
    }

    const drawVideo = (item: VideoEmbeddedType, index: number) => (
        <div className="row--element" key={'video' + index}>
            <VideoEmbedded videoId={item.videoId}
                           overlay={item.overlay}/>
        </div>
    );

    return (
        <div className="row">
            {
                list.map(drawVideo)
            }

        </div>
    );
}

export default App;
