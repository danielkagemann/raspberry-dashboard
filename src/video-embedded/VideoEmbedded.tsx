import {FunctionComponent} from "react";

type Props = {
    videoId: string,
    overlay: string,
};

export const VideoEmbedded: FunctionComponent<Props> = ({videoId, overlay}) => {

    const renderOverlay = () => {
        const splits = overlay.split(' ');
        return splits.map(item => (<div className="videoembedded--overlay-item">{item}</div>))
    };

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&mute=1&allowFullScreen=true&allow=autoplay`;

    return (
        <div className="videoembedded">
            <iframe frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="."
                    width="100%"
                    height="100%"
                    src={url}
            ></iframe>
        </div>
    );

    // return (
    //     <>
    //         <YouTube videoId={videoId}
    //                  className={'videoembedded'}
    //                  opts={opts}/>
    //         <div className="videoembedded--overlay">{renderOverlay()}</div>
    //     </>);
}

