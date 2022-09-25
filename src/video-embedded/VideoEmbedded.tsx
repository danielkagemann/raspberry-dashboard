import {FunctionComponent} from "react";
import { useWindowSize } from "react-use";
import YouTube, {YouTubeProps} from 'react-youtube';


type Props = {
    videoId: string,
    overlay: string,
};

export const VideoEmbedded: FunctionComponent<Props> = ({videoId, overlay}) => {
    const {height} = useWindowSize();

    const aspectRatio = 1.78;
    const cx = height*aspectRatio;

    const opts: YouTubeProps['opts'] = {
        width: cx,
        height,
        playerVars: {
            autoplay: 1,
            controls: 0,
            showInfo: 0,
            mute: 1,
            allowFullScreen: true,
            allow: 'autoplay'
        },
    };

    const renderOverlay = () => {
        const splits = overlay.split(' ');
        return splits.map(item => (<div className="videoembedded--overlay-item">{item}</div>))
    };

    return (
        <>
            <YouTube videoId={videoId}
                     className={'videoembedded'}
                     opts={opts}/>
            <div className="videoembedded--overlay">{renderOverlay()}</div>
        </>);
}

