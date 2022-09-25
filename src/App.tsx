import React, {useEffect, useRef, useState} from 'react';
import {VideoEmbedded} from "./video-embedded/VideoEmbedded";
import {AlertScreen, AlertType} from "./alert-screen/AlertScreen";

const DURATION = 30000;

const list: Array<{ videoId: string, overlay: string }> = [
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

    const [index, setIndex] = useState<number>(0);
    const [alert, setAlert] = useState<AlertType|null>(null)
    const handle = useRef<any>();

    /**
     * next video with start over handling
     */
    const next = () => {
        const nid = index + 1 === list.length ? 0 : index + 1;
        handle.current = setTimeout(() => setIndex(nid), DURATION)
    }

    useEffect(() => {
        next();
        return () => {
            clearTimeout(handle.current);
        }
    }, [index]);

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
        }catch (e) {
            console.log(e);
        }


    }, []);

    if (alert !== null) {
        return <AlertScreen type={alert.type} message={alert.message} />
    }

    return (
        <VideoEmbedded videoId={list[index].videoId} overlay={list[index].overlay}/>
    );
}

export default App;
