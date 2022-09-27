import {FunctionComponent} from "react";
import {isPortrait} from "../../Helper";

export type AlertType = {
    type: 'error' | 'info',
    message: string
;
}
export const AlertScreen: FunctionComponent<AlertType> = ({type, message}) => (
  <div className={`alert alert--${type}`}>
      <div className={`alert--text ${isPortrait() ? 'portrait' : ''}`}>{message}</div>
  </div>
);
