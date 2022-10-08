import {FunctionComponent, useEffect, useRef, useState} from "react";
import YouTube, {YouTubeProps} from 'react-youtube';

export type VideoEmbeddedType = {
    videoId: string,
    overlay: string,
};

export const VideoEmbedded: FunctionComponent<VideoEmbeddedType> = ({videoId, overlay}) => {
    const ref = useRef<any>();

    useEffect(() => {
        if (ref.current) {
            const frame = ref.current.container;
            const parent = frame.parentElement;
            if (parent) {

                const {height} = frame.getBoundingClientRect();
                const parentSize = parent.getBoundingClientRect();

                const aspectRatio = 1.78; // 16:9
                let cx = height * aspectRatio;

                if (parentSize.width > cx) {
                    cx = parentSize.width;
                    frame.style.height = `${cx / aspectRatio}px`;
                }
                const cx2 = cx / 2;
                frame.style.width = `${cx}px`;
                frame.style.left = '50%';
                frame.style.marginLeft = `-${cx2}px`;
            }
        }
    }, [ref.current]);

    const opts: YouTubeProps['opts'] = {
        height: 640,
        width: 480,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            showInfo: 0,
            mute: 1,
            allowFullScreen: true
        },
    };

    const renderOverlay = () => {
        const splits = overlay.split(' ');
        return splits.map(item => (<div className="videoembedded--overlay-item">{item}</div>))
    };

    return (
        <div className="videoembedded">
            <YouTube videoId={videoId}
                     ref={ref}
                     opts={opts}/>
            <div className="videoembedded--overlay">{renderOverlay()}</div>
        </div>
    );
}

