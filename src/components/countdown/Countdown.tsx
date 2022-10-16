import React, {CSSProperties} from "react";
import {FunctionComponent, PropsWithChildren} from "react";
import {isPortrait} from "../../Helper";

interface Props {
    seconds: number,
    total: number
}

export const Countdown: FunctionComponent<Props> = ({seconds = 0, total = 100}) => {
    const basisStyle = {
        position: 'fixed',
        backgroundColor: '#4f4fa7',
        transition: 'all 500ms ease-in',
    };

    let addStyle: any = {
        bottom: 0,
        left: 0,
        width: '10px',
        height: ((seconds * 100) / total) + 'vh',
    };

    if (isPortrait()) {
        addStyle = {
            left: 0,
            top: 0,
            width: ((seconds * 100) / total) + 'vw',
            height: '10px'
        };
    }

    return <div style={{...basisStyle, ...addStyle} as CSSProperties}/>
}
