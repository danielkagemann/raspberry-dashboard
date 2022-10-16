import React, {PropsWithChildren, ReactElement, useEffect, useState} from "react";
import {AlertScreen} from "../alert-screen/AlertScreen";

export const Opening = ({children}: PropsWithChildren): ReactElement => {
    const OPEN = {from: 7, to: 20};
    const [hour, setHour] = useState<number>(new Date().getHours());

    useEffect(() => {
        const handle = setInterval(() => setHour(new Date().getHours()), 60 * 1000);
        return () => {
            clearInterval(handle);
        };
    }, []);

    if (hour < OPEN.from || hour > OPEN.to) {
        return (<AlertScreen type={'dark'} message={'Geschlossen'}/>);
    }
    return <>{children}</>;
}
