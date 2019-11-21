import uuid from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';

export const set_alert = (alert_type, message ) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { id, alert_type, message }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
}