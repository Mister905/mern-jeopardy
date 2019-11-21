import React from 'react';

const capitalize_string = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Alert = ({ alert }) => {
    return (
        <div className="row">
            <div className="col m6 offset-m3">
                <div className={`card card-${ alert.alert_type }`}>
                    <div className="card-content white-text">
                        <span className="card-title center-align">{ capitalize_string(alert.alert_type) }</span>
                        <p className="center-align">{ alert.message }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert;
