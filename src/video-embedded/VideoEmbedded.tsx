import {FunctionComponent, useEffect, useRef} from "react";

export type VideoEmbeddedType = {
    videoId: string,
    overlay: string,
};

export const VideoEmbedded: FunctionComponent<VideoEmbeddedType> = ({videoId, overlay}) => {

    const ref = useRef<any>();

    const renderOverlay = () => {
        const splits = overlay.split(' ');
        return splits.map(item => (<div className="videoembedded--overlay-item">{item}</div>))
    };

    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&mute=1&allowFullScreen=true&allow=autoplay&iv_load_policy=3&modestbranding=1`;

    useEffect(() => {
        if (ref.current) {

            const parent = ref.current.parentElement;

            if (parent) {

                const {width, height} = ref.current.getBoundingClientRect();

                const parentSize = parent.getBoundingClientRect();

                const aspectRatio = 1.78; // 16:9
                let cx = height * aspectRatio;

                if (parentSize.width > cx) {
                    cx = parentSize.width;
                    ref.current.style.height = `${cx / aspectRatio}px`;
                }
                const cx2 = cx / 2;

                ref.current.style.width = `${cx}px`;
                ref.current.style.left = '50%';
                ref.current.style.marginLeft = `-${cx2}px`;
            }
        }
    }, [ref.current]);

    return (
        <div className="videoembedded">
            <iframe frameBorder="0"
                    width={'100%'}
                    height={'100%'}
                    ref={ref}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="."
                    src={url}
            ></iframe>
            <div className="videoembedded--overlay">{renderOverlay()}</div>
        </div>
    );
}

