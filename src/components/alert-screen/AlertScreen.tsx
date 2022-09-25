import {FunctionComponent} from "react";

export type AlertType = {
    type: 'error' | 'info',
    message: string
;
}
export const AlertScreen: FunctionComponent<AlertType> = ({type, message}) => (
  <div className={`alert alert--${type}`}>
      <div className={'alert--text'}>{message}</div>
  </div>
);
