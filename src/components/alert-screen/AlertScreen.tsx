import React from "react";
import {FunctionComponent} from "react";
import {isPortrait} from "../../Helper";

export type AlertType = {
    type: 'error' | 'info' | 'dark',
    message: string
;
}
export const AlertScreen: FunctionComponent<AlertType> = ({type, message}) => (
  <div className={`alert alert--${type}`}>
      <div className={`alert--text ${isPortrait() ? 'portrait' : ''}`}>
          {message.split(' ').map((item)=>(<div>{item}</div>))}
      </div>
  </div>
);
