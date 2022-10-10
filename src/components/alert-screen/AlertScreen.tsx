import React from "react";
import {FunctionComponent} from "react";
import {isPortrait} from "../../Helper";

export type AlertType = {
    type: 'error' | 'info' | 'dark',
    message: string
;
}
export const AlertScreen: FunctionComponent<AlertType> = ({type, message}) => (
  <div className={`alert alert--${type}  ${isPortrait() ? 'portrait portrait--sizes' : ''}`}>
      <div className={'alert--text'}>
          {message.split(' ').map((item)=>(<div>{item}</div>))}
      </div>
  </div>
);
